<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .csshub-loading {
        width: pxTorem(200*0.7);
        height: pxTorem(200*0.7);
    }

    .csshub-cls-1,
    .csshub-cls-2 {
        fill: none;
        stroke-linecap: bevel;
        stroke-linejoin: round;
    }

    .csshub-cls-1 {
        stroke-width: pxTorem(4*0.7);
    }

    .csshub-cls-2 {
        fill: none;
        stroke: #ff5005;
        stroke-width: pxTorem(8*0.7);
    }
</style>
<template>
    <svg class="csshub-loading" viewBox="-25 -25 100 100" preserveAspectRatio>
        <defs>
            <linearGradient id="gr-simple" x1="0" y1="0" x2="100%" y2="100%">
                <stop stop-color="rgba(255,119,60,.2)" offset="10%" />
                <stop stop-color="rgba(255,119,60,.7)" offset="90%" />
            </linearGradient>
        </defs>
        <circle class="csshub-cls-1" cx="26" cy="27" r="26" stroke="url(#gr-simple)" />
        <path class="csshub-cls-2" d="M25,0A24.92,24.92,0,0,1,42.68,7.32" transform="translate(1 2)">
            <animateTransform attributeName="transform" type="rotate" dur="1s" from="0 26 27" to="360 26 27" repeatCount="indefinite"
            />
        </path>
    </svg>
</template>