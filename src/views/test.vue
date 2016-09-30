<style lang='sass'>
@import '../assets/scss/variable.scss';
</style>
<template>
    <div class='test'>
        <v-spinner></v-spinner>
        <button class='btn btn-blue' @click='loading=true'>show loading</button>
        <br>
        <br>
        <button class='btn btn-blue' @click='modal=true'>show modal</button>
        <br>
        <br>
        <button class='btn btn-blue' @click='confirm=true'>show confirm</button>
        <v-loading :show.sync='loading'></v-loading>
        <v-modal :show.sync='modal'>
            <div>modal</div>
        </v-modal>
        <canvas id='canvas' style='border:1px solid black'></canvas>
    </div>
</template>
<script>
import vSpinner from 'components/v-spinner'
import vModal from 'components/v-modal'
import vLoading from 'components/v-loading'
import vConfirm from 'components/v-confirm'
export default {
    components: {
        vSpinner,
        vLoading,
        vModal,
        vConfirm
    },
    data() {
        return {
            loading: false,
            modal: false,
            confirm: false
        }
    },
    methods: {
        okTest() {
            alert('你点击了');
            this.confirm = !this.confirm;
        }
    },
    ready() {
        let canvas = document.querySelector('#canvas');
        let ctx = canvas.getContext('2d');

        canvas.setAttribute('width', `${this.pxTorem(500)}px`);
        canvas.setAttribute('height', `${this.pxTorem(400)}px`);
        ctx.beginPath();
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, this.pxTorem(350), this.pxTorem(200));
        ctx.closePath();
    },
    methods: {
        pxTorem(value) {
            let clientWidth = document.documentElement.clientWidth;
            return value * clientWidth / 750;
        }
    }
}
</script>
