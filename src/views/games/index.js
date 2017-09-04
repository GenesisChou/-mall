module.exports = {
    template: `<router-view></router-view>`,
    name: 'games',
    created() {
        let path = `/games/${this.$route.params.id}/evprotection`;
        if (this.$route.fullPath.length > path.length) {
            path = this.$route.fullPath;
        }
        this.$router.replace({
            path
        })
    }
}