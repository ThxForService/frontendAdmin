'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';

const GroupListContainer = ({ searchParams }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode('group');
  }, [setMenuCode, setSubMenuCode]);

  const [programs, setPrograms] = useState({}); 
  const [errors, setErrors] = useState({}); 

  const fetchPrograms = useCallback(async () => {
    try {
      const data = await apiGetGroupPrograms();
      setPrograms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms(); 
  }, [fetchPrograms]);

  
  return (
    <div>
      <h1>집단 상담 프로그램 목록</h1>
      <ul>
        {programs.map((program) => (
          <li key={program.pgmSeq}>
            {program.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(GroupListContainer);
