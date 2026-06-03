import json

with open('dataNganh.txt', 'r', encoding='utf-8') as f:
    majors = json.load(f)

major_name_to_id = {}
for idx, major in enumerate(majors, 1):
    major_name_to_id[major['major_name'].lower()] = idx

career_map = {
    1: {'p': ['Quản trị kinh doanh', 'Kinh tế', 'Quản lý công'], 'r': ['Kinh doanh thương mại', 'Kinh tế quốc tế']},
    2: {'p': ['Marketing', 'Truyền thông đa phương tiện', 'Quan hệ công chúng'], 'r': ['Kinh doanh thương mại', 'Báo chí']},
    3: {'p': ['Quản trị kinh doanh', 'Kinh doanh thương mại'], 'r': ['Thương mại điện tử']},
    4: {'p': ['Quản trị nhân lực', 'Quan hệ lao động'], 'r': ['Tâm lý học', 'Khoa học quản lý']},
    5: {'p': ['Kế toán', 'Kiểm toán', 'Tài chính - ngân hàng'], 'r': ['Toán kinh tế']},
    6: {'p': ['Tài chính - ngân hàng', 'Kinh tế đầu tư'], 'r': ['Thống kê kinh tế', 'Toán kinh tế']},
    7: {'p': ['Kinh tế đầu tư', 'Tài chính - ngân hàng'], 'r': ['Toán kinh tế']},
    8: {'p': ['Kỹ thuật phần mềm', 'Khoa học máy tính', 'Kỹ thuật máy tính'], 'r': ['Toán tin', 'Hệ thống thông tin']},
    9: {'p': ['Công nghệ thông tin', 'Hệ thống thông tin', 'Quản lý dự án'], 'r': ['Hệ thống thông tin quản lý']},
    10: {'p': ['Thiết kế đồ họa', 'Truyền thông đa phương tiện'], 'r': ['Công nghệ truyền thông']},
    11: {'p': ['Hệ thống thông tin', 'An toàn thông tin'], 'r': ['Khoa học dữ liệu']},
    12: {'p': ['Khoa học dữ liệu', 'Toán tin', 'Thống kê kinh tế'], 'r': ['Hệ thống thông tin', 'Thống kê']},
    13: {'p': ['An toàn thông tin', 'Mạng máy tính và truyền thông dữ liệu'], 'r': ['Khoa học máy tính']},
    14: {'p': ['Mạng máy tính và truyền thông dữ liệu', 'Hệ thống thông tin'], 'r': ['Công nghệ thông tin']},
    15: {'p': ['Mạng máy tính và truyền thông dữ liệu', 'Khoa học máy tính'], 'r': ['Kỹ thuật phần mềm']},
    16: {'p': ['Kỹ thuật xây dựng', 'Kỹ thuật cơ sở hạ tầng', 'Công nghệ kỹ thuật xây dựng'], 'r': ['Kinh tế xây dựng', 'Quản lý xây dựng']},
    17: {'p': ['Kỹ thuật cơ khí', 'Công nghệ chế tạo máy'], 'r': ['Cơ kỹ thuật', 'Kỹ thuật hệ thống công nghiệp']},
    18: {'p': ['Kỹ thuật điện', 'Công nghệ kỹ thuật điện, điện tử'], 'r': ['Kỹ thuật cơ điện tử']},
    19: {'p': ['Kỹ thuật điều khiển và tự động hóa', 'Kỹ thuật cơ điện tử'], 'r': ['Kỹ thuật điện', 'Công nghệ kỹ thuật điện tử - viễn thông']},
    20: {'p': ['Kiến trúc', 'Quy hoạch vùng và đô thị'], 'r': ['Công nghệ kỹ thuật kiến trúc', 'Kiến trúc cảnh quan']},
    21: {'p': ['Thiết kế nội thất', 'Kiến trúc nội thất'], 'r': ['Thiết kế mỹ thuật sân khấu, điện ảnh']},
    22: {'p': ['Thiết kế đồ họa', 'Đồ họa', 'Mỹ thuật đô thị'], 'r': ['Công nghệ kỹ thuật in']},
    23: {'p': ['Nhiếp ảnh', 'Quay phim', 'Công nghệ điện ảnh, truyền hình'], 'r': ['Thiết kế âm thanh, ánh sáng']},
    24: {'p': ['Luật', 'Luật kinh tế', 'Luật quốc tế'], 'r': ['Giáo dục pháp luật', 'Quản lý nhà nước']},
    25: {'p': ['Giáo dục mầm non'], 'r': ['Sư phạm âm nhạc', 'Tâm lý học giáo dục']},
    26: {'p': ['Giáo dục tiểu học'], 'r': ['Sư phạm âm nhạc', 'Tâm lý học giáo dục']},
    27: {'p': ['Sư phạm toán học', 'Sư phạm ngữ văn', 'Sư phạm tiếng anh', 'Sư phạm vật lý', 'Sư phạm hóa học'], 'r': ['Sư phạm lịch sử - địa lý', 'Sư phạm khoa học tự nhiên']},
    28: {'p': ['Giáo dục học', 'Quản lý giáo dục'], 'r': ['Công nghệ giáo dục']},
    29: {'p': ['Điều dưỡng', 'Hộ sinh'], 'r': ['Kỹ thuật phục hồi chức năng']},
    30: {'p': ['Răng - hàm - mặt', 'Kỹ thuật phục hình răng'], 'r': ['Y khoa']},
    31: {'p': ['Y khoa', 'Y học cổ truyền'], 'r': ['Y học dự phòng']},
    32: {'p': ['Kỹ thuật xét nghiệm y học'], 'r': ['Công nghệ sinh học', 'Sinh học ứng dụng']},
    33: {'p': ['Thú y', 'Chăn nuôi'], 'r': ['Sinh học']},
    34: {'p': ['Quản trị nhà hàng và dịch vụ ăn uống', 'Kỹ thuật thực phẩm'], 'r': ['Công nghệ thực phẩm']},
    35: {'p': ['Công nghệ thực phẩm', 'Quản trị nhà hàng và dịch vụ ăn uống'], 'r': ['Kỹ thuật thực phẩm', 'Đảm bảo chất lượng và an toàn thực phẩm']},
    36: {'p': ['Quản trị nhà hàng và dịch vụ ăn uống'], 'r': ['Du lịch']},
    37: {'p': ['Quản trị nhà hàng và dịch vụ ăn uống'], 'r': ['Quản trị khách sạn']},
    38: {'p': ['Quản trị khách sạn', 'Du lịch'], 'r': ['Quản trị dịch vụ du lịch và lữ hành']},
    39: {'p': ['Quản trị dịch vụ du lịch và lữ hành', 'Du lịch', 'Việt nam học'], 'r': ['Ngôn ngữ anh', 'Quốc tế học']},
    40: {'p': ['Bất động sản', 'Quản trị kinh doanh'], 'r': ['Kinh tế đầu tư']},
    41: {'p': ['Bảo hiểm', 'Tài chính - ngân hàng'], 'r': ['Toán kinh tế']},
    42: {'p': ['Kinh doanh thương mại', 'Marketing'], 'r': ['Thương mại điện tử']},
    43: {'p': ['Kế toán', 'Quản trị kinh doanh'], 'r': ['Kiểm toán']},
    44: {'p': ['Logistics và quản lý chuỗi cung ứng', 'Kinh doanh quốc tế'], 'r': ['Kinh tế quốc tế']},
    45: {'p': ['Kỹ thuật điện tử - viễn thông', 'Bảo dưỡng công nghiệp'], 'r': ['Kỹ thuật điện']},
    46: {'p': ['Công nghệ chế biến lâm sản', 'Thiết kế nội thất'], 'r': ['Kỹ thuật công nghiệp']},
    47: {'p': ['Kỹ thuật ô tô', 'Công nghệ kỹ thuật ô tô'], 'r': ['Kỹ thuật cơ khí động lực']},
    48: {'p': ['Điều tra hình sự', 'Quản lý nhà nước về an ninh trật tự', 'Trinh sát an ninh'], 'r': ['Luật']},
    49: {'p': ['Phòng cháy chữa cháy và cứu nạn cứu hộ'], 'r': ['Bảo hộ lao động']},
    50: {'p': ['Khai thác vận tải', 'Quản lý trật tự an toàn giao thông'], 'r': ['Logistics và quản lý chuỗi cung ứng']},
    51: {'p': ['Khai thác vận tải'], 'r': ['Kỹ thuật giao thông']},
    52: {'p': ['Kỹ thuật hàng không', 'Quản lý hoạt động bay'], 'r': ['Khoa học hàng hải']},
    53: {'p': ['Quản trị dịch vụ du lịch và lữ hành', 'Du lịch'], 'r': ['Ngôn ngữ anh']}
}

inserts = []
inserts.append('-- =========================')
inserts.append('-- CAREER_MAJOR MAP')
inserts.append('-- =========================')

def find_major_id(name):
    name_lower = name.lower()
    if name_lower in major_name_to_id:
        return major_name_to_id[name_lower]
    # search partial
    for k, v in major_name_to_id.items():
        if name_lower == k or (name_lower in k and len(name_lower) > 5):
            return v
    return None

for career_id, data in career_map.items():
    primary_ids = set()
    # 1. Map Primaries
    for p_name in data['p']:
        m_id = find_major_id(p_name)
        if m_id:
            inserts.append(f"INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES ({career_id}, {m_id}, 1);")
            primary_ids.add(m_id)
            
    # 2. Map Related
    for r_name in data['r']:
        m_id = find_major_id(r_name)
        if m_id and m_id not in primary_ids:
            inserts.append(f"INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES ({career_id}, {m_id}, 0);")
            primary_ids.add(m_id)

with open('new_mapping.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(inserts))
