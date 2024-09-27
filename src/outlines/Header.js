import React, { useCallback } from 'react';
import styled from 'styled-components';
import cookies from 'react-cookies';
import { useTranslation } from 'react-i18next';
import { getCommonStates } from '../commons/contexts/CommonContext';
import { getUserContext } from '@/commons/contexts/UserInfoContext';
import { useRouter } from 'next/navigation';

const HeaderBox = styled.header`
  .site-top {
    background: ${({ theme }) => theme.colors.white};
    height: 65px;

    div {
      text-align: right;

      a, span {
        display: inline-block;
        line-height: 34px;
        margin-left: 15px; // Adjusted margin for spacing
        font-size: ${({ theme }) => theme.fontSizes.normal};
        
        &.logout {
          cursor: pointer; // Change cursor to pointer on hover
        }

        &.on {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;

const Header = () => {
  const { t } = useTranslation();
  const { showHeader } = getCommonStates();
  const {
    states: { isLogin, userInfo, isAdmin },
    actions: { setIsLogin, setIsAdmin, setUserInfo },
  } = getUserContext();

  const router = useRouter();

  const onLogout = useCallback(() => {
    setIsLogin(false);
    setIsAdmin(false);
    setUserInfo(null);
    cookies.remove('token', { path: '/' });

    router.push('http://thxforservice.xyz:7000');

  }, [setIsLogin, setIsAdmin, setUserInfo, router]);

  return (
    showHeader && (
      <HeaderBox>
        <section className="site-top">
          <div className="layout-width">
            {isLogin ? (
              <>
                {/* 로그인 상태 */}
                <span>
                  {userInfo?.username}({userInfo?.email}){t('관리자님_로그인')}
                </span>
                <span className="logout" onClick={onLogout} >{t('로그아웃')}</span>
              </>
            ) : (
              <>
                <a href="/member/join">{t('회원가입')}</a>
                <a href="/member/login">{t('로그인')}</a>
              </>
            )}
          </div>
        </section>
      </HeaderBox>
    )
  );
};

export default React.memo(Header);
