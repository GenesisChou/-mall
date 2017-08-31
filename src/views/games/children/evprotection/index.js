module.exports = {
    template: `
    <keep-alive>
         <router-view></router-view>
    </keep-alive> 
    `,
    watch: {
        $route() {
            window.scrollTo(0, 0);
        }
    },

}