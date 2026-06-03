import json
import re

with open('dataNganh.txt', 'r', encoding='utf-8') as f:
    majors = json.load(f)

# 1. Generate INSERT statements for Majors
major_inserts = []
major_inserts.append("-- =========================")
major_inserts.append("-- MAJORS")
major_inserts.append("-- =========================")
major_inserts.append("SET IDENTITY_INSERT Majors ON;")

# Keep track of mapping: MajorName -> MajorId (1-based index)
major_name_to_id = {}
for idx, major in enumerate(majors, 1):
    major_name_to_id[major['major_name'].lower()] = idx
    # Escape quotes
    major_name = major['major_name'].replace("'", "''")
    major_inserts.append(f"INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES ({idx}, '{major['major_code']}', N'{major_name}', '{major['group_code']}');")

major_inserts.append("SET IDENTITY_INSERT Majors OFF;")

# 2. Extract Careers from data.sql
with open('data.sql', 'r', encoding='utf-8') as f:
    data_sql = f.read()

# We need career mappings. 
# Here is the manual mapping (Career ID -> List of Major Names to match)
career_mapping = {
    1: ['Quản trị kinh doanh'],
    2: ['Marketing'],
    3: ['Quản trị kinh doanh', 'Kinh doanh thương mại'],
    4: ['Quản trị nhân lực'],
    5: ['Kế toán', 'Kiểm toán'],
    6: ['Tài chính - ngân hàng'],
    7: ['Tài chính - ngân hàng'],
    8: ['Kỹ thuật phần mềm', 'Khoa học máy tính'],
    9: ['Kỹ thuật phần mềm', 'Khoa học máy tính', 'Công nghệ thông tin'],
    10: ['Thiết kế đồ họa'],
    11: ['Hệ thống thông tin', 'Khoa học máy tính'],
    12: ['Khoa học dữ liệu', 'Toán tin'],
    13: ['Kỹ thuật phần mềm', 'Hệ thống thông tin', 'Công nghệ thông tin'],
    14: ['Mạng máy tính và truyền thông dữ liệu'],
    15: ['Công nghệ thông tin', 'Mạng máy tính và truyền thông dữ liệu'],
    16: ['Kỹ thuật xây dựng', 'Kỹ thuật xây dựng công trình giao thông'],
    17: ['Kỹ thuật cơ khí', 'Công nghệ kỹ thuật cơ khí'],
    18: ['Kỹ thuật điện', 'Công nghệ kỹ thuật điện, điện tử'],
    19: ['Kỹ thuật cơ điện tử', 'Công nghệ kỹ thuật điều khiển và tự động hóa'],
    20: ['Kiến trúc'],
    21: ['Thiết kế nội thất'],
    22: ['Thiết kế đồ họa'],
    23: ['Nhiếp ảnh'],
    24: ['Luật', 'Luật kinh tế'],
    25: ['Giáo dục mầm non'],
    26: ['Giáo dục tiểu học'],
    27: ['Công nghệ thông tin', 'Sư phạm tin học'],
    28: ['Sư phạm toán học', 'Sư phạm ngữ văn', 'Sư phạm tiếng anh'],
    29: ['Điều dưỡng'],
    30: ['Răng - hàm - mặt'],
    31: ['Y khoa'],
    32: ['Kỹ thuật xét nghiệm y học'],
    33: ['Thú y'],
    34: ['Quản trị nhà hàng và dịch vụ ăn uống', 'Công nghệ thực phẩm'],
    35: ['Quản trị nhà hàng và dịch vụ ăn uống'],
    36: ['Quản trị nhà hàng và dịch vụ ăn uống'],
    37: ['Quản trị nhà hàng và dịch vụ ăn uống'],
    38: ['Quản trị khách sạn'],
    39: ['Quản trị dịch vụ du lịch và lữ hành'],
    40: ['Bất động sản'],
    41: ['Bảo hiểm'],
    42: ['Quản trị kinh doanh', 'Marketing'],
    43: ['Kế toán'],
    44: ['Kinh doanh thương mại'],
    45: ['Kỹ thuật điện', 'Công nghệ kỹ thuật điện, điện tử'],
    46: ['Công nghệ chế biến lâm sản'],
    47: ['Kỹ thuật ô tô', 'Công nghệ kỹ thuật ô tô'],
    48: ['Quản lý công', 'Giáo dục quốc phòng - an ninh'],
    49: ['Quản lý công', 'Kỹ thuật môi trường'],
    50: ['Logistics và quản lý chuỗi cung ứng'],
    51: ['Kỹ thuật giao thông', 'Logistics và quản lý chuỗi cung ứng'],
    52: ['Kỹ thuật hàng không'],
    53: ['Quản trị dịch vụ du lịch và lữ hành']
}

career_major_inserts = []
career_major_inserts.append("-- =========================")
career_major_inserts.append("-- CAREER_MAJOR MAP")
career_major_inserts.append("-- =========================")

for career_id, major_names in career_mapping.items():
    for m_name in major_names:
        m_name_lower = m_name.lower()
        if m_name_lower in major_name_to_id:
            major_id = major_name_to_id[m_name_lower]
            career_major_inserts.append(f"INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES ({career_id}, {major_id}, 1);")
        else:
            # Try to find a partial match
            found = False
            for mapped_name, mapped_id in major_name_to_id.items():
                if m_name_lower in mapped_name or mapped_name in m_name_lower:
                    career_major_inserts.append(f"INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES ({career_id}, {mapped_id}, 1);")
                    found = True
                    break

# 3. Append to data.sql
with open('data.sql', 'a', encoding='utf-8') as f:
    f.write('\n\n')
    f.write('\n'.join(major_inserts))
    f.write('\n\n')
    f.write('\n'.join(career_major_inserts))
    f.write('\n')

print("Successfully appended to data.sql")
