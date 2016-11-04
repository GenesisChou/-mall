<style type="text/css" scoped>
.test {
    height: 100%;
    overflow: hidden;
}

.edit-address {
    .header {
        border-bottom: 1px solid $gray-light;
    }
}
</style>
<template>
    <div class='test'>
        <button class='btn btn-red' @click='togglePopup'>popup</button>
        <v-popup :show='popup' :toggle-popup='togglePopup'>
            <form class='edit-address'>
                <header class='header'>
                    <h1 class='text-center'>新增收货地址</h1>
                </header>
                <section class='main'>
                    <div class='flex'>
                        <label for='name'>收货人</label>
                        <input id='name' class='flex-item' placeholder="姓名">
                    </div>
                    <div class='flex'>
                        <label for='phone'>联系电话</label>
                        <input id='phone' class='flex-item' placeholder="手机或固定电话">
                    </div>
                    <div class='flex'>
                        <label >选择地址</label>
                        <div class='flex flex-item'>
                        	<span class='flex-item'>选择省份</span>
                        	<span class='flex-item'>选择城市</span>
                        	<span class='flex-item'>选择地区</span>
                        </div>
                    </div>
                    <div class='flex'>
                        <label for='address'>详细地址</label for='address'>
                        <input id='address' class='flex-item' placeholder="不少5个字，无需重复地址信息">
                    </div>

                </section>
                <footer class='footer text-center'>
                    <button class='btn btn-blue'>保存</button>
                </footer>
            </form>
        </v-popup>
    </div>
</template>
<script type="text/javascript">
import vPopup from 'components/v_popup.vue';
export default {
    components: {
        vPopup
    },
    data() {
        return {
            popup: true
        }
    },
    methods: {
        togglePopup() {
            this.popup = !this.popup;
        }
    }
}
</script>
