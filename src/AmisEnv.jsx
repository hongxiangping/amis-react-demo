import { toast, makeTranslator, LazyComponent } from 'amis';
import axios from 'axios';
import { normalizeLink } from 'amis-core';
import copy from 'copy-to-clipboard';
import { qsparse, parseQuery, attachmentAdpator } from 'amis-core';
import { useNavigate, useLocation } from 'react-router-dom';

export function getAmisEnv(locale) {
  const __ = makeTranslator(locale);
  const navigate = useNavigate()

  return {
    updateLocation: (location, replace) => {
      // history[replace ? 'replace' : 'push'](normalizeLink(location));
      // 使用react-router-dom V6的useNavigate实现
      if (replace) {
        // 相当于history.replace()
        navigate(normalizeLink(location), { replace: true });
      } else {
        navigate(normalizeLink(location));
      }
    },
    jumpTo: (to, action) => {
      if (to === 'goBack') {
        return useNavigate(-1);
      }
      to = normalizeLink(to);
      if (action && action.actionType === 'url') {
        action.blank === false
          ? (window.location.href = to)
          : window.open(to);
        return;
      }
      if (action && to && action.target) {
        window.open(to, action.target);
        return;
      }
      if (/^https?:\/\//.test(to)) {
        window.location.replace(to);
      } else {
        useNavigate(to);
      }
    },
    isCurrentUrl: to => {
      const link = normalizeLink(to);
      const location = useLocation();
      console.log(location.state);
      let pathname = link;
      let search = '';
      const idx = link.indexOf('?');
      if (~idx) {
        pathname = link.substring(0, idx);
        search = link.substring(idx);
      }

      if (search) {
        if (pathname !== location.pathname || !location.search) {
          return false;
        }
        const currentQuery = parseQuery(location);
        const query = qsparse(search.substring(1));

        return Object.keys(query).every(
          key => query[key] === currentQuery[key]
        );
      } else if (pathname === location.pathname) {
        return true;
      }

      return false;
    },
    fetcher: async api => {
      let { url, method, data, responseType, config, headers } = api;
      config = config || {};
      config.url = url;
      responseType && (config.responseType = responseType);

      if (config.cancelExecutor) {
        config.cancelToken = new axios.CancelToken(config.cancelExecutor);
      }

      config.headers = headers || {};
      config.method = method;
      config.data = data;

      if (method === 'get' && data) {
        config.params = data;
      } else if (data && data instanceof FormData) {
        // config.headers['Content-Type'] = 'multipart/form-data';
      } else if (
        data &&
        typeof data !== 'string' &&
        !(data instanceof Blob) &&
        !(data instanceof ArrayBuffer)
      ) {
        data = JSON.stringify(data);
        config.headers['Content-Type'] = 'application/json';
      }

      // 支持返回各种报错信息
      config.validateStatus = function () {
        return true;
      };

      let response = await axios(config);
      response = await attachmentAdpator(response, __, api);

      if (response.status >= 400) {
        if (response.data) {
          // 主要用于 raw: 模式下，后端自己校验登录，
          if (
            response.status === 401 &&
            response.data.location &&
            response.data.location.startsWith('http')
          ) {
            location.href = response.data.location.replace(
              '{{redirect}}',
              encodeURIComponent(location.href)
            );
            return new Promise(() => { });
          } else if (response.data.msg) {
            throw new Error(response.data.msg);
          } else {
            throw new Error(JSON.stringify(response.data, null, 2));
          }
        } else {
          throw new Error(`${response.status}`);
        }
      } else {
        console.log(api);
      }

      return response;
    },
    isCancel: value => axios.isCancel(value),
    copy: (content, options) => {
      copy(content, options);
      toast.success('内容已复制到粘贴板');
    },
    blockRouting: fn => {
      // history.block 监听路由的跳转操作，阻塞跳转，实现拦截，并在用户处理完需要的操作之后（如数据保存、提交、关闭弹窗），才放开跳转权限，允许用户跳转下一页面。
      // return history.block(fn);
    },
    tracker(eventTrack) {
      console.debug('eventTrack', eventTrack);
    },
    loadTinymcePlugin: async tinymce => {
      // 参考：https://www.tiny.cloud/docs/advanced/creating-a-plugin//
      tinymce.PluginManager.add('example', function (editor, url) {
        var openDialog = function () {
          return editor.windowManager.open({
            title: 'Example plugin',
            body: {
              type: 'panel',
              items: [
                {
                  type: 'input',
                  name: 'title',
                  label: 'Title'
                }
              ]
            },
            buttons: [
              {
                type: 'cancel',
                text: 'Close'
              },
              {
                type: 'submit',
                text: 'Save',
                primary: true
              }
            ],
            onSubmit: function (api) {
              var data = api.getData();
              /* Insert content when the window form is submitted */
              editor.insertContent('Title: ' + data.title);
              api.close();
            }
          });
        };
        /* Add a button that opens a window */
        editor.ui.registry.addButton('example', {
          text: 'My button',
          onAction: function () {
            /* Open window */
            openDialog();
          }
        });
        /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
        editor.ui.registry.addMenuItem('example', {
          text: 'Example plugin',
          onAction: function () {
            /* Open window */
            openDialog();
          }
        });
        /* Return the metadata for the help plugin */
        return {
          getMetadata: function () {
            return {
              name: 'Example plugin',
              url: 'http://exampleplugindocsurl.com'
            };
          }
        };
      });
    }
  };
}

