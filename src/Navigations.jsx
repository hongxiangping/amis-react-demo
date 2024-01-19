import EasyPageSchema from './pages/Examples/Easy';
import ErrorPageSchema from './pages/Examples/Error';
import FormPageSchema from './pages/Examples/Form';
import TableBookSchema from './pages/Examples/BootManage';
import TableCrudSchema from './pages/CRUD/Table';
import TableAutoFillSchema from './pages/CRUD/TableAutoFill';
import ItemActionsSchema from './pages/CRUD/ItemActions';
import GridCrudSchema from './pages/CRUD/Grid';
import ListCrudSchema from './pages/CRUD/List';
import LoadMoreSchema from './pages/CRUD/LoadMore';
import FixedCrudSchema from './pages/CRUD/Fix';
import AsideCrudSchema from './pages/CRUD/Aside';
import Aside2CrudSchema from './pages/CRUD/Aside2';
import FieldsCrudSchema from './pages/CRUD/Fields';
import JumpNextCrudSchema from './pages/CRUD/JumpNext';
import PopOverCrudSchema from './pages/CRUD/PopOver';
import KeyboardsCrudSchema from './pages/CRUD/Keyboards';
import FootableCrudSchema from './pages/CRUD/Footable';
import NestedCrudSchema from './pages/CRUD/Nested';
import MergeCellSchema from './pages/CRUD/MergeCell';
import HeaderGroupSchema from './pages/CRUD/HeaderGroup';
import HeaderHideSchema from './pages/CRUD/HeaderHide';
import LoadOnceTableCrudSchema from './pages/CRUD/LoadOnce';
import CRUDDynamicSchema from './pages/CRUD/Dynamic';
import CRUDSimplePagerSchema from './pages/CRUD/SimplePager';
import CRUDParsePrimitiveQuerySchema from './pages/CRUD/ParsePrimitiveQuery';
import CRUDMatchFuncSchema from './pages/CRUD/MatchFunc';
import ItemActionchema from './pages/CRUD/ItemAction';

export const navigations = [
  {
    label: '示例',
    children: [
      {
        label: '示例页面',
        icon: 'fa fa-th',
        badge: 3,
        badgeClassName: 'bg-info',
        children: [
          {
            label: '简单页面',
            path: '/examples/index',
            component: EasyPageSchema
          },
          {
            label: '初始化出错',
            path: '/examples/error',
            component: ErrorPageSchema
          },
          {
            label: '表单页面',
            path: '/examples/form',
            component: FormPageSchema
          },
          {
            label: '图书管理',
            path: '/examples/book',
            component: TableBookSchema
          },
        ]
      },

      {
        label: '增删改查',
        icon: 'fa fa-table',
        children: [
          {
            label: '表格模式',
            path: '/crud/table',
            component: TableCrudSchema
          },
          {
            label: '表格高度自适应',
            path: '/crud/auto-fill',
            component: TableAutoFillSchema
          },
          {
            label: '卡片模式',
            path: '/crud/grid',
            component: GridCrudSchema
          },
          {
            label: '列表模式',
            path: '/crud/list',
            component: ListCrudSchema
          },
          {
            label: '加载更多模式',
            path: '/crud/load-more',
            component: LoadMoreSchema
          },
          {
            label: '操作交互显示',
            path: '/crud/item-actions',
            component: ItemActionsSchema
          },
          {
            label: '列类型汇总',
            path: '/crud/columns',
            component: FieldsCrudSchema
          },
          {
            label: '可折叠',
            path: '/crud/footable',
            component: FootableCrudSchema
          },
          {
            label: '嵌套',
            path: '/crud/nested',
            component: NestedCrudSchema
          },
          {
            label: '合并单元格',
            path: '/crud/merge-cell',
            component: MergeCellSchema
          },
          {
            label: '表头分组',
            path: '/crud/header-group',
            component: HeaderGroupSchema
          },
          {
            label: '表头隐藏',
            path: '/crud/header-hide',
            component: HeaderHideSchema
          },
          {
            label: '带边栏（用 tree）',
            path: '/crud/aside',
            component: AsideCrudSchema
          },
          {
            label: '带边栏（用 Nav）',
            path: '/crud/aside2',
            component: Aside2CrudSchema
          },
          {
            label: '固定表头/列',
            path: '/crud/fixed',
            component: FixedCrudSchema
          },
          {
            label: '键盘操作编辑',
            path: '/crud/keyboards',
            component: KeyboardsCrudSchema
          },
          {
            label: '操作并下一个',
            path: '/crud/jump-next',
            component: JumpNextCrudSchema
          },
          {
            label: '列展示详情',
            path: '/crud/popover',
            component: PopOverCrudSchema
          },
          {
            label: '前端分页',
            icon: 'fa fa-list-ol',
            children: [
              {
                label: '一次性加载',
                path: '/crud/load-once',
                component: LoadOnceTableCrudSchema
              },
              {
                label: '匹配函数',
                path: '/crud/match-func',
                component: CRUDMatchFuncSchema
              }
            ]
          },
          {
            label: '点击联动',
            path: '/crud/item-action',
            component: ItemActionchema
          },
          {
            label: '动态列',
            path: '/crud/dynamic',
            component: CRUDDynamicSchema
          },
          {
            label: '简单分页',
            path: '/crud/simple-pager',
            component: CRUDSimplePagerSchema
          },
          {
            label: '解析Query参数',
            path: '/crud/parse-primitive-query',
            component: CRUDParsePrimitiveQuerySchema
          }
        ]
      }
    ]
  }
];