function BPJS_Setujui_OK(duit) {
    let pelayanan70 = 70 / 100 * duit;
    let pelayanan30 = 30 / 100 * duit;
    let hitung70 = 35 / 100 * pelayanan70;
    let hitung30 = 35 / 100 * pelayanan30;
    let jasaRS70 = 65 / 100 * pelayanan70;
    let jasaRS30 = 65 / 100 * pelayanan30;
    let jasaRS = jasaRS70 + jasaRS30;
    let data = {
        pelayanan70,
        pelayanan30,
        hitung70,
        hitung30,
        jasaRS
    }
    return data;
}

function BPJS_Setujui(duit) {
    let pelayanan35 = 70 / 100 * duit;
    let hitung35 = 35 / 100 * pelayanan35;
    let jasaRS35 = 65 / 100 * pelayanan35;
    let data = {
        pelayanan35,
        hitung35,
        jasaRS35
    }
    return data;
}

function jasa_OK(duit) {
    let DPJP_OK = 65 / 100 * duit;
    let perawat_OK = 34.5 / 100 * duit;
    let cssd = 0.5 / 100 * duit;
    let data = {
        DPJP_OK,
        perawat_OK,
        cssd
    }
    return data;
}

function sarana(duit) {
    let bcu = 10 / 100 * duit;
    let BJP_strutural = 6.5 / 100 * duit;
    let penunjang1 = 1 / 100 * duit;
    let penunjang2 = 3 / 100 * duit;
    let penunjang3 = 3 / 100 * duit;
    let penunjang4 = 4 / 100 * duit;
    let igd = 200000;
    let ruangan = 100000;
    let sisa = duit - (bcu + BJP_strutural + penunjang1 + penunjang2 + penunjang3 + penunjang4 + igd + ruangan);
    let data = {
        bcu,
        BJP_strutural,
        penunjang1,
        penunjang2,
        penunjang3,
        penunjang4,
        igd,
        ruangan,
        sisa
    }
    return data;
}

function pelayanan(duit) {
    let DPJP_RawatInap = 48 / 100 * duit;
    let perawat = 31 / 100 * duit;
    let managemnet = 21 / 100 * duit;
    let data = {
        DPJP_RawatInap,
        perawat,
        managemnet
    }
    return data;
}

module.exports = {
    BPJS_Setujui_OK,
    jasa_OK,
    sarana,
    pelayanan
}