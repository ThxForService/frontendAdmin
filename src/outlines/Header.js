import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import cookies from 'react-cookies';
import { useTranslation } from 'react-i18next';
import { getCommonStates } from '../commons/contexts/CommonContext';
import { getUserContext } from '@/commons/contexts/UserInfoContext';
const HeaderBox = styled.header`
  .site-top {
    background: ${({ theme }) => theme.colors.white};
    height: 65px;

    div {
      text-align: right;

      a {
        display: inline-block;
        line-height: 34px;
        margin-left: 10px;
        font-size: ${({ theme }) => theme.fontSizes.normal};

        &.on {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;

const Header = () => {
  const [login, setLogin] = useState(false);
  const { t } = useTranslation();
  const { showHeader } = getCommonStates();
  const {
    states: { isLogin, userInfo },
    actions: { setIsLogin, setIsAdmin, setUserInfo },
  } = getUserContext();
  const onLogout = useCallback(() => {
    setIsLogin(false);
    setIsAdmin(false);
    setUserInfo(null);
    cookies.remove('token', { path: '/' });
  }, [setIsLogin, setIsAdmin, setUserInfo]);

  useEffect(() => {
    setLogin(isLogin);
  }, [isLogin]);

  return (
    showHeader && (
      <HeaderBox>
        <section className="site-top">
          <div className="layout-width">
            {login ? (
              <>
                {/* 로그인 상태 */}
                <span>
                  {userInfo?.username}({userInfo?.email}){t('님_로그인')}
                </span>
                <span onClick={onLogout}>{t('로그아웃')}</span>
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
