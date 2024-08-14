document.getElementsByTagName("input")[0].focus();

document.getElementsByTagName("input")[0].addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementsByClassName("tui-button")[0].click();
    }
});

document.getElementsByClassName("tui-button")[0].addEventListener("click", function () {
    document.getElementById("resultado").innerText = "";

    let raiz = document.getElementsByTagName("input")[0].value;

    raiz = raiz.split(".").join("").split("/").join("").split("-").join("");

    let dv = "";

    switch (document.getElementsByTagName("select")[0].value) {
        case "cnpj":
            if (raiz.length > 8) {
                window.alert("Informe apenas a raiz do CNPJ.");
                return;
            }

            raiz = raiz.padStart(8, "0") + "0001";

            dv = dvCnpj(raiz);

            break;

        case "estab":
            if (raiz.length > 12) {
                window.alert("Informe apenas a raiz do CNPJ.");
                return;
            }

            raiz = raiz.padStart(12, "0");

            dv = dvCnpj(raiz);

            break;

        case "cpf":
            if (isNaN(raiz)) {
                window.alert("Informe o CPF apenas com dígitos.");
                return;
            }

            if (raiz.length > 9) {
                window.alert("Informe apenas a raiz do CPF.");
                return;
            }

            raiz = raiz.padStart(9, "0");

            dv = dvCpf(raiz);

            break;
    }

    document.getElementById("resultado").innerText = raiz + dv;
});

function dvCnpj(raiz) {
    var pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    var soma1 = 0;
    var soma2 = 0;
    var digito = 0;

    for (var i = 0; i < 12; i++) {
        digito = raiz[i].charCodeAt() - 48;
        soma1 += digito * pesos[i + 1];
        soma2 += digito * pesos[i]
    }

    resto1 = soma1 % 11;

    if (resto1 < 2) {
        dv1 = 0;
    } else {
        dv1 = 11 - resto1;
    }

    soma2 += 2 * dv1;
    resto2 = soma2 % 11;

    if (resto2 < 2) {
        dv2 = 0;
    } else {
        dv2 = 11 - resto2;
    }

    return `${dv1}${dv2}`;
}

function dvCpf(raiz) {
    var pesos = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    var soma1 = 0;
    var soma2 = 0;
    var digito = 0;

    for (var i = 0; i < 9; i++) {
        digito = parseInt(raiz[i]);
        soma1 += digito * pesos[i + 1];
        soma2 += digito * pesos[i]
    }

    resto1 = soma1 % 11;

    if (resto1 < 2) {
        dv1 = 0;
    } else {
        dv1 = 11 - resto1;
    }

    soma2 += 2 * dv1;
    resto2 = soma2 % 11;

    if (resto2 < 2) {
        dv2 = 0;
    } else {
        dv2 = 11 - resto2;
    }

    return `${dv1}${dv2}`;
}