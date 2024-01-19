import React, { useEffect, useState } from 'react';
import {
  NotFound,
  Layout,
  AsideNav,
  AlertComponent,
  Button,
  Spinner,
  ToastComponent,
  Select,
} from 'amis-ui';
import 'amis-ui/lib/locale/en-US';
import 'amis-ui/lib/locale/zh-CN';
import { navigations } from './Navigations';
import { getRoutes } from './PageRoutes';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
  Link,
  NavLink,
  useLocation
} from 'react-router-dom';
declare const _hmt: any;

let ContextPath = '';
// if (process.env.NODE_ENV === 'production') {
//   ContextPath = '/amis';
// }

export function getContextPath() {
  return ContextPath;
}

const themes = [
  {
    label: '云舍',
    ns: 'cxd-',
    value: 'cxd'
  },
  {
    label: '仿 AntD',
    ns: 'antd-',
    value: 'antd'
  },
  {
    label: 'ang',
    ns: 'a-',
    value: 'ang'
  }
];

const locales = [
  {
    label: '中文',
    value: 'zh-CN'
  },

  {
    label: 'English',
    value: 'en-US'
  }
];

function getPath(path: string) {
  return path
    ? path[0] === '/'
      ? ContextPath + path
      : `${ContextPath}/${path}`
    : '';
}

export function App() {
  const viewMode = "pc";
  const [offScreen, setOffScreen] = useState(false);
  const [folded, setfolded] = useState(false);
  const [theme] = useState(themes[1]);
  const [locale, setlocale] = useState(locales[0]);
  const location = useLocation();

  useEffect(() => {
    [].slice
      .call(document.querySelectorAll('link[title]'))
      .forEach((item: HTMLLinkElement) => {
        const theme = item.getAttribute('title');
        item.disabled = theme !== theme.value;
      });
    const body = document.body;
    body.classList.add(theme.value);
  }, [theme]);

  // 渲染header部分UI
  const renderHeader = () => {

    return (
      <>
        <div
          className={`${theme.ns}Layout-brandBar`}
        >
          <div
            onClick={() => setOffScreen(!offScreen)}
            className={`${theme.ns}Layout-offScreen-btn pull-right visible-xs`}
          >
            <i className="bui-icon iconfont icon-collapse"></i>
          </div>
          <div className={`${theme.ns}Layout-brand text-ellipsis`}>
            <i className="fa fa-paw" />
            <span className="hidden-folded m-l-sm">AMIS 示例</span>
          </div>
        </div>

        <div
          className={`${theme.ns}Layout-headerBar pc:flex items-center`}
        >
          <Button
            onClick={() => setfolded(!folded)}
            type="button"
            level="link"
            className="navbar-btn"
          >
            <i
              className={`fa fa-${folded ? 'indent' : 'dedent'
                } fa-fw`}
            ></i>
          </Button>

          {/* header链接 */}
          <ul className={`HeaderLinks`}>
          </ul>

          {/* header上的下拉框。比如语言选择，主题选择等功能！ */}
          <div className="hidden-xs ml-auto">
            <Select
              overlayPlacement="right-bottom-right-top"
              clearable={false}
              theme={theme.value}
              value={locale.value}
              options={locales}
              onChange={locale => {
                // 咱不支持切换语言
                // setlocale(locale);
                // localStorage.setItem('amis-locale', locale);
                window.location.reload();
              }}
            />
          </div>

          {/* 在这里可以添加一些“个人设置”等相关功能按钮 */}
          <div id="Header-toolbar"></div>
        </div>
      </>
    );
  }
  // 渲染左侧菜单部分UI
  const renderAsideNav = () => {
    return (
      <AsideNav
        navigations={navigations.map((item: any) => ({
          ...item,
          children: item.children
            ? item.children
              .map((item: any) => ({
                ...item,
                className: 'is-top'
              }))
            : []
        }))}
        renderLink={({
          link,
          active,
          toggleExpand,
          classnames: cx,
          depth
        }: any) => {
          let children = [];

          if (link.children && link.children.length) {
            children.push(
              <span
                key="expand-toggle"
                className={cx('AsideNav-itemArrow')}
                onClick={e => toggleExpand(link, e)}
              ></span>
            );
          }

          link.badge &&
            children.push(
              <b
                key="badge"
                className={cx(
                  `AsideNav-itemBadge`,
                  link.badgeClassName || 'bg-info'
                )}
              >
                {link.badge}
              </b>
            );

          if (link.icon) {
            children.push(
              <i key="icon" className={cx(`AsideNav-itemIcon`, link.icon)} />
            );
          } else if (folded && depth === 1) {
            children.push(
              <i
                key="icon"
                className={cx(
                  `AsideNav-itemIcon`,
                  link.children ? 'fa fa-folder' : 'fa fa-info'
                )}
              />
            );
          }

          children.push(
            <span className={cx('AsideNav-itemLabel')} key="label">
              {link.label}
            </span>
          );

          return link.path ? (
            /^https?\:/.test(link.path) ? (
              <a target="_blank" href={link.path} rel="noopener">
                {children}
              </a>
            ) : (
              <Link
                to={
                  getPath(link.path) ||
                  (link.children && getPath(link.children[0].path))
                }
              >
                {children}
              </Link>
            )
          ) : (
            <a onClick={link.children ? () => toggleExpand(link) : undefined}>
              {children}
            </a>
          );
        }}
        isActive={(link: any) => isActive(link, location)}
      />
    );
  }

  // 渲染content（页面）
  const renderContent = () => {
    return (
      <React.Suspense
        fallback={<Spinner overlay spinnerClassName="m-t-lg" size="lg" />}
      >
        <Routes>
          {
            getRoutes({
              theme: theme.value,
              classPrefix: theme.ns,
              locale: locale.value,
              viewMode: viewMode,
              offScreen: offScreen
            })
          }
          <Route path={`${ContextPath}/`} element={<Navigate to={`${ContextPath}/examples/index`} />} />
          <Route path={`${ContextPath}/examples`} element={<Navigate to={`${ContextPath}/examples/index`} />} />
          <Route path={`${ContextPath}/crud`} element={<Navigate to={`${ContextPath}/crud/table`} />} />
          {/* 如果没匹配上以上的路由，则显示404页面 */}
          {/* 生产环境下，只有使用HashRouter时才会生效。使用BrowserRouter需要在nginx中额外配置指向的404页面 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    );
  }

  return (
    <Layout
      theme={theme.value}
      offScreen={offScreen}
      folded={folded}
      header={renderHeader()}
      aside={renderAsideNav()}
    >
      <ToastComponent theme={theme.value} locale={locale.value} />
      <AlertComponent theme={theme.value} locale={locale.value} />
      {renderContent()}
    </Layout>
  );
}

// 判断当前菜单是否选中
function isActive(link: any, location: any) {
  return !!(link.path && getPath(link.path) === location.pathname);
}

export default function entry() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
