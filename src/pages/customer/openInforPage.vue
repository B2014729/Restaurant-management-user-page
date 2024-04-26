<template>
    <div class="open">
        <div class="d-flex justify-content-center">
            <div class="mt-5" style="position: relative;">
                <h1 class="fw-bold">___OPENING HOURS___</h1>
                <p class="fst-italic text-warning">Call For Reservations</p>
                <h2>Monday to Sunday</h2>
                <h1>8:30 - 23:00</h1>
                <p>(Last order 21:45)</p>
                <p class="end-text">RESERVATION NUMBER: +84 243935 2485 (Ext.105)</p>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style scoped>
.open {
    height: 520px;
    background:
        linear-gradient(rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.5)),
        url('../../assets/images/open.png');
    background-size: cover;
}

h2 {
    font-family: 'Times New Roman', Times, serif;
    font-size: 42px;
    color: rgba(255, 174, 0, 0.781);
    font-style: italic
}

.end-text {
    margin-left: 40px;
    position: absolute;
    bottom: -200px;
}
</style>