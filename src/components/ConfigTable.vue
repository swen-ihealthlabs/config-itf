<template>
  <div>
    <Table width="550" height="400" border :loading="this.isLoading" :columns="columns2" :data="data3"></Table>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      columns2: [
        {
          title: 'Key',
          key: 'key',
          width: 200
        },
        {
          title: 'Value',
          key: 'value',
          width: 220
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 130,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                },
                'Edit'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                },
                'Delete'
              )
            ]);
          }
        }
      ],
      data3: [
        {
          key: 'John Brown',
          value: 18
        },
        {
          key: 'Jim Green',
          value: 24
        },
        {
          key: 'Joe Black',
          value: 30
        },
        {
          key: 'Jon Snow',
          value: 26
        },
        {
          key: 'Jon Snow',
          value: 26
        },
        {
          key: 'Jon Snow',
          value: 26
        },
        {
          key: 'Jon Snow',
          value: 26
        },
        {
          key: 'Jon Snow',
          value: 26
        },
        {
          key: 'Jon Snow',
          value: 26
        }
      ]
    };
  },
  computed: mapState(['isLoading'])
};
</script>
