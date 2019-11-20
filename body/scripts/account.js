function accountLine() {
    account.logged_in ? (jQuery("#guest-line").css("display", "none"), $(".account-name").html(account.user_name), $("#account-type").html("<a href='/pricing'><div class='acct_type_btn_" + account.account_type + "'></div></a>"), $(".account-email-address").html(account.email), jQuery("#account-line").css("display", "inline")) : (jQuery("#account-line").css("display", "none"), $(".account-name").html(""), $("#account-type").html(""), $(".account-email-address").html(""), jQuery("#guest-line").css("display", "inline"))
}
function showHideAds(t) {
    //void 0 == t || void 0 == t.account_type || "lite" == t.account_type ? $("#zygote-ads").html('<a href="https://go.zygote.com/zygote-body-optin"><video width="100%" autoplay><source src="/img/zygote.mp4" type="video/mp4"></video></a>').css("display", "inline-block") : $("#zygote-ads").html("").css("display", "none")
}
function accountInfoCB(t) {
    //if ("error" == t.status) alert("Unable to get account information");
    //else if (account = t, 0 == t.logged_in);
    //else {
    //    t.state
    //}
    accountLine(),
    showHideAds(account)
}
function login(t) {
    for (var n = jQuery(":input", t), e = {
        action: "login"
    }, a = 0; a < n.length; a++) e[n[a].name] = n[a].value;
    return document.getElementById("rememberme").checked ? e.rememberme = !0 : e.rememberme = !1,
    jQuery.post("/ajax/login_account.php", e, loginCB, "json"),
    !1
}
function premium() {}
function loginCB(t) {
    if (account = t, "fail" == t.status) jQuery(".login-msg").html(t.msg);
    else {
        t.state;
        window.viewer_.navUI_.refresh()
    }
    accountLine()
}
function login_cook() {
    var t = {
        action: "login"
    };
    return jQuery.post("/ajax/login_account.php", t, loginCB, "json"),
    !1
}
function getCookie(t) {
    for (var n = t + "=", e = document.cookie.split(";"), a = 0; a < e.length; a++) {
        var o = e[a].trim();
        if (0 == o.indexOf(n)) return o.substring(n.length, o.length)
    }
    return ""
}
function newAccount(t) {
    for (var n = jQuery(":input", t), e = {
        action: "new_account"
    }, a = 0; a < n.length; a++) e[n[a].name] = n[a].value;
    return jQuery.post("/ajax/new_account.php", e, newAcctFreeCB, "json"),
    !1
}
function premium_account(t) {
    for (var n = jQuery(":input", t), e = {
        action: "premium_account"
    }, a = 0; a < n.length; a++) e[n[a].name] = n[a].value;
    return jQuery.post("/ajax/premium_account.php", e, newAcctCB, "json"),
    !1
}
function newAcctCB(t) {
    if (account = t, 0 == t.status) jQuery(".new-acct-msg").html(t.msg);
    else {
        jQuery.facebox({
            div: "#premium-signup-popup-msg"
        });
        var n = {
            action: "login",
            rememberme: "false",
            email: t.user_email,
            password: t.user_password
        };
        jQuery.post("/ajax/login_account.php", n, null, "json")
    }
}
function newAcctFreeCB(t) {
    account = t,
    0 == t.status ? alert(t.msg) : switchTo("pop-msg")
}
function newSingUp(t) {
    account = t,
    0 == t.status ? jQuery(".new-acct-msg").html(t.msg) : switchTo("sing_up")
}
function newLogin(t) {
    account = t,
    0 == t.status ? jQuery(".new-acct-msg").html(t.msg) : switchTo("pop_login")
}
function resetPassword(t) {
    for (var n = jQuery(":input", t), e = {
        action: "reset_password"
    }, a = 0; a < n.length; a++) e[n[a].name] = n[a].value;
    return jQuery.post("/ajax/reset_password.php", e, resetPasswordCB, "json"),
    !1
}
function resetPasswordCB(t) {
    account = t,
    "fail" == t.status ? jQuery(".reset-msg").html(t.msg) : (jQuery(".reset-msg").html(""), switchTo("password_reset")),
    accountLine()
}
function editMyAccount() {
    jQuery(document).trigger("close.facebox"),
    setTimeout(function () {
        jQuery.facebox({
            div: "#my_account_edit"
        }),
        $("input[name=f_name]").val(account.f_name),
        $("input[name=l_name]").val(account.l_name),
        $("input[name=email]").val(account.email),
        jQuery("#bg-my-account-edit .tabs-content .tab-content.basic-information").show(),
        jQuery("#bg-my-account-edit .tabs .basic-information").addClass("bg-my-account-tab-selected"),
        jQuery("#bg-my-account-edit .tabs-content .tab-content.billing-information").hide(),
        jQuery("#bg-my-account-edit .tabs .tab").click(function () {
            var t = jQuery(this).attr("class");
            t.indexOf("basic-information") >= 0 && (jQuery("#bg-my-account-edit .tabs-content .tab-content.basic-information").show(), jQuery("#bg-my-account-edit").addClass("bg-my-account-background"), jQuery("#bg-my-account-edit .tabs-content .tab-content.billing-information").hide(), jQuery("#bg-my-account-edit .tabs .basic-information").addClass("bg-my-account-tab-selected"), jQuery("#bg-my-account-edit .tabs .billing-information").removeClass("bg-my-account-tab-selected")),
            t.indexOf("billing-information") >= 0 && (jQuery("#bg-my-account-edit .tabs-content .tab-content.billing-information").show(), jQuery("#bg-my-account-edit").removeClass("bg-my-account-background"), jQuery("#bg-my-account-edit .tabs-content .tab-content.basic-information").hide(), jQuery("#bg-my-account-edit .tabs .billing-information").addClass("bg-my-account-tab-selected"), jQuery("#bg-my-account-edit .tabs .basic-information").removeClass("bg-my-account-tab-selected"))
        })
    }, 500)
}
function saveAccountBillingInformation(t) {
    alert("to do...")
}
function saveAcctInfo(t, n) {
    for (var e = jQuery(":input", t), a = {
        action: "update_account"
    }, o = !0, c = 0; c < e.length; c++) a[e[c].name] = e[c].value,
    "email" == e[c].name && (o = isValidEmailAddress(e[c].value));
    return a.typeOfInformation = n,
    o ? "basic" == n ? jQuery.post("/ajax/update_account.php", a, saveAcctCB, "json") : "billing" == n && jQuery.post("/ajax/premium_account.php", a, updateAccountPremiumInformationCB, "json") : alert("Please enter a valid email address."),
    !1
}
function isValidEmailAddress(t) {
    return new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(t)
}
function saveAcctCB(t) {
    account = t,
    0 == t.status ? jQuery(".update-acct-msg").html(t.msg) : (jQuery(document).trigger("close.facebox"), jQuery.get("/ajax/account.php", updateAccountInstance, "json"))
}
function updateAccountPremiumInformationCB(t) {
    0 == t.status ? alert(t.msg) : jQuery(document).trigger("close.facebox")
}
function updateAccountInstance(t) {
    1 == t.status && (account = t, accountLine())
}
function saveState(t) {
    var n = {
        action: "save_state",
        state: t
    };
    jQuery.post("body/accounts/state", n, saveStateCB, "json")
}
function saveStateCB(t) {}
function logout() {
    var t = {
        action: "logout"
    };
    account.account_type = "",
    jQuery.post("/ajax/account_logout.php", t, accountLogoutCB, "json"),
    accountLine(),
    viewer_.navUI_.refresh()
}
function accountLogoutCB(t) {
    "error" == t.status ? alert("Unable to get account information") : (account = t, 0 == t.logged_in && jQuery.facebox({
        div: "#logout_goodbye"
    })),
    accountLine()
}
var ajax_url = "/ajax/account.php",
    account = {};
jQuery(document).ready(function () {
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            }
        }),
        jQuery.get("body/accounts/info", null, accountInfoCB, "json")
    }),
zg.account = {},
zg.account.listFolder = function (t, n) {
        var e = {
            action: "list",
            path: t
        };
        jQuery.post("body/scenes/list", e, n, "json")
    },
zg.account.loadFile = function (t, n) {
        var e = {
            action: "load",
            path: t
        };
        jQuery.post("body/scenes/load", e, n, "json")
    },
zg.account.saveFile = function (t, n, e) {
        var n = {
            action: "save",
            path: t,
            data: n
        };
        jQuery.post("body/scenes/save", n, e, "json")
    },
zg.account.removeFile = function (t, n) {
        var e = {
            action: "delete",
            path: t
        };
        jQuery.post("body/scenes/delete", e, n, "json")
    },
zg.account.renameFile = function (t, n, e) {
        var a = {
            action: "rename",
            path: t,
            newpath: n
        };
        jQuery.post("body/scenes/rename", a, e, "json")
    },
zg.account.printList = function (t) {
        o3v.log.info("zg.account.printList");
        for (var n = 0; n < t.files.length; n++) o3v.log.info(t.files[n].name)
    },
zg.account.isLiteUser = function () {
        return void 0 == account || void 0 == account.account_type || "lite" == account.account_type
    },
zg.account.isPremiumUser = function () {
        return void 0 != account && "premium" == account.account_type
    },
zg.account.isProfessionalUser = function () {
        return void 0 != account && "professional" == account.account_type
    };