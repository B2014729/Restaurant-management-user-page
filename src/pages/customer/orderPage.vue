<template>
    <div style="min-height: 700px;" class="mt-4">
        <div class="d-flex justify-content-center">
            <div class="d-flex mt-2">
                <i class="fa-solid fa-grip-lines"></i>
                <i class="fa-solid fa-grip-lines"></i>
                <i class="fa-solid fa-grip-lines"></i>
            </div>
            <h4 class="mx-3 fw-bold">MAKE A RESERVATION</h4>
            <div class="d-flex mt-2">
                <i class="fa-solid fa-grip-lines"></i>
                <i class="fa-solid fa-grip-lines"></i>
                <i class="fa-solid fa-grip-lines"></i>
            </div>
        </div>
        <div class="d-flex justify-content-center my-4">
            <div>
                <span class="text-black fs-4" style="font-family: 'Times New Roman', Times, serif;">
                    __________________________________Open Hours__________________________________</span>
                <p class="hours-time">Monday to Sunday 11:30 - 22:00</p>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
            <form class="row" style="width: 900px;">
                <div class="col-md-6 col-12">
                    <p class="text-dark text-start fs-5">Book a table</p>
                    <div class="mb-3">
                        <input type="date" class="form-control rounded-0" id="date" placeholder="Date">
                    </div>
                    <div class="mb-3">
                        <input type="time" class="form-control  rounded-0" id="time">
                    </div>
                    <div class="mb-3">
                        <input type="number" class="form-control  rounded-0" id="quantity" placeholder="Quantity">
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <p class="text-dark text-start fs-5">Contact details</p>
                    <div class="mb-3">
                        <input type="text" class="form-control  rounded-0" id="name" placeholder="Name">
                    </div>
                    <div class="mb-3">
                        <input type="email" class="form-control  rounded-0" id="email" placeholder="Email">
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control  rounded-0" id="phone" placeholder="Phone">
                    </div>
                </div>
                <div class="mb-3">
                    <textarea class="form-control rounded-0" id="exampleFormControlTextarea1" rows="5"
                        placeholder="Message"></textarea>
                </div>
                <div><button class="btn btn-outline-warning rounded-0 fw-bold py-3 px-5"> SEND RESQUEST</button></div>
            </form>
        </div>
    </div>
</template>

<style scoped>
i {
    color: orange;
}

h4 {
    color: black;
    font-family: 'Times New Roman', Times, serif;
}

.hours-time {
    color: rgb(74, 94, 0);
    font-weight: bold;
}
</style>