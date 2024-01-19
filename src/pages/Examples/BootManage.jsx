export default {
  "type": "page",
  "title": "图书管理",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "西游记",
        "code": "xiyouji",
        "publisher": "人民文学出版社"
      },
      {
        "id": 2,
        "name": "三国演义",
        "code": "sanguoyanyi",
        "publisher": "人民文学出版社"
      },
      {
        "id": 3,
        "name": "红楼梦",
        "code": "红楼梦",
        "publisher": "人民文学出版社"
      },
      {
        "id": 4,
        "name": "水浒传",
        "code": "水浒传",
        "publisher": "人民文学出版社"
      }
    ],
    "page": 1,
    "total": 4 // 注意！！！这里不是当前请求返回的 items 的长度，而是数据库中一共有多少条数据，用于生成分页组件。如果你不想要分页，把这个不返回就可以了。
  },
  "body": [
    {
      "type": "crud",
      "syncLocation": false,
      // "api": {
      //   "method": "get",
      //   "url": "/pages/book-list-mock.json"
      // },
      "columns": [
        {
          "name": "id",
          "label": "ID",
          "type": "text",
          "id": "u:d6b09b634bbb"
        },
        {
          "name": "name",
          "label": "书名",
          "type": "text",
          "id": "u:5fe27f449078"
        },
        {
          "type": "text",
          "label": "编号",
          "name": "code",
          "id": "u:7a2ecd94ccc6"
        },
        {
          "type": "text",
          "label": "出版日期",
          "name": "public_date",
          "id": "u:90c3d2acb8cd"
        },
        {
          "type": "operation",
          "label": "操作",
          "buttons": [
            {
              "label": "编辑",
              "type": "button",
              "actionType": "dialog",
              "level": "link",
              "dialog": {
                "title": "编辑",
                "body": {
                  "type": "form",
                  "api": "xxx/update",
                  "body": [
                    {
                      "name": "id",
                      "label": "ID",
                      "type": "input-text",
                      "id": "u:516a0665a2d0"
                    },
                    {
                      "name": "name",
                      "label": "书名",
                      "type": "input-text",
                      "id": "u:4c544196e46d"
                    },
                    {
                      "label": "编号",
                      "name": "code",
                      "type": "input-text",
                      "id": "u:b334ceb3beb5"
                    },
                    {
                      "label": "出版日期",
                      "name": "public_date",
                      "type": "input-text",
                      "id": "u:6032b2a2260a"
                    }
                  ],
                  "id": "u:f21f7c9fca79"
                }
              },
              "id": "u:c4bdf86f1878"
            },
            {
              "label": "查看",
              "type": "button",
              "actionType": "dialog",
              "level": "link",
              "dialog": {
                "title": "查看详情",
                "body": {
                  "type": "form",
                  "api": "xxx/update",
                  "body": [
                    {
                      "name": "id",
                      "label": "ID",
                      "type": "static",
                      "id": "u:a25adfe2037a"
                    },
                    {
                      "name": "name",
                      "label": "书名",
                      "type": "static",
                      "id": "u:a7bf07a1442d"
                    },
                    {
                      "label": "编号",
                      "name": "code",
                      "type": "static",
                      "id": "u:c443ab5db42e"
                    },
                    {
                      "label": "出版日期",
                      "name": "public_date",
                      "type": "static",
                      "id": "u:895cf0dea7f3"
                    }
                  ],
                  "id": "u:5d35cc2e8b5f"
                }
              },
              "id": "u:85aec4767c38"
            },
            {
              "type": "button",
              "label": "删除",
              "actionType": "ajax",
              "level": "link",
              "className": "text-danger",
              "confirmText": "确定要删除？",
              "api": {
                "method": "post",
                "url": "/pages/book-list-mock.json"
              },
              "id": "u:11e36572d386"
            }
          ],
          "id": "u:2d2edf5bf643"
        }
      ],
      "bulkActions": [
        {
          "type": "button",
          "level": "danger",
          "label": "批量删除",
          "actionType": "ajax",
          "confirmText": "确定要删除？",
          "api": "/xxx/batch-delete",
          "id": "u:cda4ab7e4e95"
        },
        {
          "type": "button",
          "label": "批量编辑",
          "actionType": "dialog",
          "dialog": {
            "title": "批量编辑",
            "size": "md",
            "body": {
              "type": "form",
              "api": "/xxx/bacth-edit",
              "body": [
                {
                  "label": "字段1",
                  "text": "字段1",
                  "type": "input-text",
                  "id": "u:f53569e4ab8f"
                }
              ],
              "id": "u:82e91b39191d"
            }
          },
          "id": "u:848418b01bcc"
        }
      ],
      "itemActions": [],
      "features": [
        "create",
        "filter",
        "bulkDelete",
        "bulkUpdate",
        "update",
        "view",
        "delete"
      ],
      "filterColumnCount": 3,
      "headerToolbar": [
        {
          "label": "新增",
          "type": "button",
          "actionType": "dialog",
          "level": "primary",
          "dialog": {
            "title": "新增",
            "body": {
              "type": "form",
              "api": {
                "method": "post",
                "url": "/pages/book-list-mock.json"
              },
              "body": [
                {
                  "type": "input-text",
                  "name": "id",
                  "label": "ID",
                  "id": "u:ec191b37cbde"
                },
                {
                  "type": "input-text",
                  "name": "name",
                  "label": "书名",
                  "id": "u:06251c350577"
                },
                {
                  "type": "input-text",
                  "name": "code",
                  "label": "编号",
                  "id": "u:01ed454b3403"
                },
                {
                  "type": "input-text",
                  "name": "public_date",
                  "label": "出版日期",
                  "id": "u:43b08953fb66"
                }
              ],
              "id": "u:823baf2bca3c"
            }
          },
          "id": "u:f384fcc74dde"
        },
        "bulkActions"
      ],
      "id": "u:c4baef4f3e04",
      "perPageAvailable": [
        10
      ],
      "messages": {},
      "filter": {
        "title": "查询条件",
        "body": [
          {
            "type": "input-text",
            "name": "keywords",
            "label": "关键字",
            "id": "u:18025bcfc841"
          }
        ],
        "id": "u:71c8fd15dc75",
        "actions": [
          {
            "type": "submit",
            "label": "搜索",
            "primary": true,
            "id": "u:a33ff0ce96b2"
          }
        ]
      }
    }
  ],
  "id": "u:29b149bd8405",
  "pullRefresh": {
    "disabled": true
  },
  "regions": [
    "body",
    "toolbar",
    "header"
  ]
};
