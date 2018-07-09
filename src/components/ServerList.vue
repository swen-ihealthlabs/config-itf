<template>
  <div>
  <h3>Select a server from below:</h3>
  <br>
  <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4">
        <Button type="ghost" @click="goto('demo')">Demo</Button>
      </Col>
      <Col span="4">
        <Button type="ghost" @click="goto('preprod')">Preprod</Button>
      </Col>
      <Col span="4">
        <Button type="ghost" @click="goto('prod')">Prod</Button>
      </Col>
  </Row>
  <br>
  <!-- <Row>
    <Col class="demo-spin-col" span="8">
      <Loading :show='isLoading' />
    </Col>
  </Row> -->
  <Row type="flex" justify="center" class="code-row-bg">
      <router-view></router-view>
  </Row>
  </div>
</template>

<script>
export default {
  methods: {
    goto(path) {
      this.$router.push(`/abpm/${path}`);
    }
  }
};
</script>
