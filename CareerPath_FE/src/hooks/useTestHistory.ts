import { useCallback, useEffect, useState } from 'react';
import { testAttemptApi } from '../api/testAttemptApi';
import { TestAttemptDetail, TestAttemptListItem } from '../types/testAttempt';

export function useTestHistory() {
  const [attempts, setAttempts] = useState<TestAttemptListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttempts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testAttemptApi.getMyAttempts();
      setAttempts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải lịch sử làm bài');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  return { attempts, loading, error, refetch: fetchAttempts };
}

export function useTestAttemptDetail(attemptId: number | null) {
  const [detail, setDetail] = useState<TestAttemptDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!attemptId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await testAttemptApi.getAttemptDetail(attemptId);
      setDetail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải chi tiết');
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    if (attemptId) {
      fetchDetail();
    } else {
      setDetail(null);
    }
  }, [attemptId, fetchDetail]);

  return { detail, loading, error, refetch: fetchDetail };
}
