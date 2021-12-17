function log_out() {
    if (confirm("Möchten Sie diese Kleinanzeige endgültig löschen?")) {
        return true;
    } else {
        return false;
    }
}
function onTheFlySignIn() {
    var passwortbox = encodeURI($(".KleinanzeigenFormularNeu #passwortbox").val());
    var emailbox = encodeURI($(".KleinanzeigenFormularNeu #emailbox").val());
    var neuereintrag = $(".neueruser").val();
    var emailbox = encodeURI($(".KleinanzeigenFormularNeu #emailbox").val());
    $(".passbox").load("/ez/sitedesign/daten/ajaxfunktionen.php?emailboxpruefung=1&email=" + emailbox);
    if (passwortbox == "") {
        return false;
    }
    $.post("/ez/sitedesign/daten/ajaxfunktionen.php", { passwortpruefung: 1, email: emailbox, pass: passwortbox }, function (data, status) {
        if (data != "") {
            $(".loginboxkleinanzeigen").html('<div class="alert alert-warning" role="alert">' + data + "</div>");
            $(".presentationsmoeglichkeit,.kostenbox").show();
            if ($("#animalNotice").length) {
                var isAlreadyAllowed = $(data).filter(".tieranzeigen_erlaubt_field").val();
                if (isAlreadyAllowed == 1) {
                    $("#animalNotice").slideUp();
                }
            }
        } else {
            $(".passwortbox").val("");
            $(".passwortbox").after("<strong>Passwort stimmt nicht überein.</strong>");
            $(".presentationsmoeglichkeit,.kostenbox").hide();
        }
    });
}
$(document).ready(function () {
    $(".bilduploaderboxmehr").on("click", function () {
        $(".bilduploaderbox4,.bilduploaderbox5,.bilduploaderbox6,.bilduploaderbox7,.bilduploaderbox8,.bilduploaderbox9").show();
        $(this).hide();
    });
    $(".deletebuttonfragen").on("click", function () {
        if (confirm("Möchten Sie diese Frage endgültig löschen?")) {
            return true;
        } else {
            return false;
        }
    });
    $(".go,.classified-preview").on("click", function () {
        var kleinanzeigenid = $(this).data("go");
        document.location.href = "/ez/index.php/kleinanzeigen/anfrage/" + kleinanzeigenid;
    });
    $(".externerLinkTransportkosten").on("click", function () {
        var transportkosten = $(this).data("go");
        window.open(transportkosten, "_blank");
    });
    $(".fromApp").on("click", function () {
        window.open("https://company.landwirt.com/produkte/mobile/", "_blank");
    });
    $(".goto").on("click", function () {
        var goto = $(this).data("go");
        document.location.href = goto;
    });
    $(document).on("click", ".gotoexturl", function () {
        var gotoexturl = $(this).data("go");
        window.open(gotoexturl, "_blank");
    });
    if ($(".classified-prev-img").length) {
        $(".classified-prev-img").each(function () {
            var bildpfad = $(this).data("kimg");
            $(this).css("background-image", "url(https://bilder.landwirt.com/thumbsfixed/" + bildpfad + ")");
        });
    }
    $(".nurdesktopoffenheader").on("click", function () {
        $(".nurdesktopoffenheader").hide();
        $(".nurdesktopoffen").show();
    });
    $(".hofladenbox").detach().appendTo("#headerbanner");
    if ($(".videohtmlcode").length) {
        $(".videohtmlcode").on("click", function () {
            $(".showvideohtmlcode").slideToggle();
        });
        var videoID = $(".commentVideo").attr("data-id");
        $.ajax({
            dataType: "json",
            type: "GET",
            url: "/ez/ezvideo/user/api.php?videoID=" + videoID,
            success: function (result) {
                data = result;
                $.each(data.items, function (key, value) {
                    var commentText = value.snippet.topLevelComment.snippet.textDisplay;
                    var commentAuthorName = value.snippet.topLevelComment.snippet.authorDisplayName;
                    var commentAuthorBild = value.snippet.topLevelComment.snippet.authorProfileImageUrl;
                    var commentLikes = value.snippet.topLevelComment.snippet.likeCount;
                    $(".commentVideo").append(
                        "<div class='commenttextVideo row'><div class='col-xs-1 text-center'><img src='" + commentAuthorBild + "'></div><div class='col-xs-11'><strong>" + commentAuthorName + "</strong><p>" + commentText + "</p></div></div>"
                    );
                });
            },
        });
    }
    $(".preishammerrahmen").parent().addClass("rahmenpreishammer mitbgw");
    $(".sprachbuttonliste").click(function () {
        let linksprache = '<li><a href="/de/?change=de"><div class="gmm_sp_de"></div> Deutschland</a></li>';
        $(".sprachmenuneu").toggle().html(linksprache);
    });
    $(".navx").on("click", function () {
        $(".sprachmenuneu").toggle();
    });
    if ($("form#commentForm").length > 0) {
        $(" #footertext,.rootlinestartseite").hide();
    }
    if ($(".loginklein").length > 0) {
        $(" #footertext,.rootlinestartseite").hide();
    }
    if ($("#formularbezahlung").length > 0) {
        $(" #footertext,.rootlinestartseite").hide();
    }
    $(".formlangversion").hide();
    $("body")
        .find("img[data-src]")
        .each(function () {
            $(this).attr("src", $(this).attr("data-src")).removeAttr("data-src");
        });
    $("#kat1").change(function () {
        var katebene1 = $("select#kat1").val();
        $("#katselectbox").load("/ez/sitedesign/daten/ajaxfunktionen.php?kleinanzeigenkat=1&katebene1=" + katebene1);
        $(".hiddenSubCatLabel").show();
        if (
            katebene1 == "527" ||
            katebene1 == "518" ||
            katebene1 == "11" ||
            katebene1 == "68" ||
            katebene1 == "10" ||
            katebene1 == "12" ||
            katebene1 == "725" ||
            katebene1 == "74" ||
            katebene1 == "66" ||
            katebene1 == "67" ||
            katebene1 == "682" ||
            katebene1 == "596" ||
            katebene1 == "706" ||
            katebene1 == "690" ||
            katebene1 == "18"
        ) {
            $(".kosten").hide();
        } else {
            $(".kosten").show();
        }
        if (katebene1 == "527" || katebene1 == "77" || katebene1 == "15" || katebene1 == "6" || katebene1 == "299") {
            $(".hinweisSaatgut").show();
        } else {
            $(".hinweisSaatgut").hide();
        }
        527;
    });
    $("#dankeforminnen .button").click(function () {
        $(".error111").hide();
        var email = $("input#email").val();
        var name = $("input#name").val();
        if (name == "") {
            $("label#name_error").show();
            $("input#name").focus();
            return false;
        }
        var strasse = $("input#strasse").val();
        if (strasse == "") {
            $("label#strasse_error").show();
            $("input#strasse").focus();
            return false;
        }
        var plz = $("input#plz").val();
        if (plz == "") {
            $("label#plz_error").show();
            $("input#plz").focus();
            return false;
        }
        var ort = $("input#ort").val();
        if (ort == "") {
            $("label#ort_error").show();
            $("input#ort").focus();
            return false;
        }
        var dataString = "name=" + name + "&strasse=" + strasse + "&plz=" + plz + "&ort=" + ort + "&email=" + email;
        $.ajax({
            type: "POST",
            url: "/ez/ezkleinanzeigen/user/process.php",
            data: dataString,
            success: function (reqCode) {
                if (reqCode == 1) {
                    $("#contact_form").html("<div id='message'></div>");
                    $("#danketext").hide();
                    $("#message").html("<h1>Formular wurde soeben versendet!</h1>").append("<p>Sie bekommen in den nächsten Tagen unser Probeheft!</p>");
                } else {
                    alert("Bitte alle Daten korrekt ausfüllen!");
                }
            },
        });
        return false;
    });
    $("#abonummereingabe").click(function () {
        $("#abonummerformular").show();
    });
    $("#abonummerformularbutton").click(function () {
        var abonummer = $("#abonummer").val();
        var plz = $("#plz").val();
        var id = $("#plz").val();
        var error = false;
        if (abonummer == "") {
            error = true;
        }
        if (plz == "") {
            error = true;
        }
        if (error == false) {
            var data = $("#formularabonumm").serialize();
            $.ajax({
                url: "/ez/ezuser/user/abousercheck.php",
                type: "POST",
                data: data,
                success: function (reqCode) {
                    if (reqCode == 1) {
                        $("#formularabonumm").fadeOut("slow");
                        $("#done").fadeIn("slow");
                        $("#abonummereingabe").hide();
                        $(".text h1").hide();
                    } else {
                        alert(
                            "Achtung: Ihre Kundennummer und Ihre PLZ stimmen nicht überein oder Sie sind mit dieser Kundennummer bereits registriert! Bitte versuchen Sie es noch einmal! Sollte der Eintrag Ihrer Kundennummer nicht funktionieren, rufen Sie uns bitte an oder schreiben Sie uns ein E-Mail. Tel.: +43(0)316-821636-163, E-Mail: waltraud.breidler@landwirt.com."
                        );
                    }
                },
            });
            $("#mailerror").hide();
            return false;
        } else {
            $("#mailerror").show();
        }
    });
    $("#headerlogin1").click(function () {
        $("#box2,#headerlogin1 .aboangebot").hide();
        $("#box1").slideToggle("slow");
    });
    $(".transportkostenheader").click(function () {
        $(".transportkostenbox").slideToggle("slow");
    });
    $(".telefonnummerliste").click(function () {
        var mytel = $(this).attr("id");
        $("#" + mytel + " .teltext").hide();
        $("#" + mytel + " .teltel").show();
    });
    $(".telefonnummerdetail").click(function () {
        var mytel = $(this).attr("id");
        $("#" + mytel + " .teltext").hide();
        $("#" + mytel + " .teltel").show();
    });
    $("#formularteil1 #benutzername").on("change", function () {
        var benutzername = $("input#benutzername").val();
        $.get("/ez/ezuser/user/check_username.php?username=" + escape(benutzername), function (data) {
            if (data != "frei") {
                $("#resultno").html(data);
                $("#formlinksenden").hide();
                $("#benutzername").val("");
                $("#benutzername").focus();
            } else {
                $("#resultno").html("");
                $("#formlinksenden").show();
            }
        });
    });
    $("#formularteil1 #email, #registerUsers #email").on("change", function () {
        var email = $("input#email").val();
        $.get("/ez/ezuser/user/check_email.php?email=" + escape(email), function (data) {
            if (data != "frei") {
                $("#resultnoemail").html(data);
                $("#formlinksenden").hide();
                $("#email").focus();
            } else {
                $("#resultnoemail").html("");
                $("#formlinksenden").show();
            }
        });
    });
    $("input#art2").click(function () {
        if ($(this).attr("checked")) {
            if ($(this).data("commercial") != "1") {
                $(".kosten").hide("show");
            }
        }
    });
    $("input#art1").click(function () {
        if ($(this).attr("checked")) {
            $(".kosten").show("show");
        }
    });
    $("#forumbild strong").click(function () {
        $("#bildeintrag").slideToggle("slow");
    });
    $("#forumlink strong").click(function () {
        $("#linkeintrag").slideToggle("slow");
    });
    $(".zeigemehr").click(function () {
        $(this).next(".verstecktertext").slideToggle("slow");
    });
    $(".closemehrtext").click(function () {
        $(this).parent().hide();
    });
    $("#weiter1").click(function () {
        $("#allnavpunkte").toggle("slow");
    });
    $("#editboxoffline").click(function () {
        $(".headerline").toggle("slow");
    });
    $("#commentForm").validate();
    if ($(".firmennewsall").length > 0) {
        $(".firmennewsall").load("/ez/sitedesign/daten/ajaxfunktionen.php?firmennews=1");
        $(".haendlernewsall").load("/ez/sitedesign/daten/ajaxfunktionen.php?haendlernews=1");
    }
    if ($(".firmennewsat").length > 0) {
        $(".firmennewsat").load("/ez/sitedesign/daten/ajaxfunktionen.php?firmennews=1&language=AT");
        $(".haendlernewsat").load("/ez/sitedesign/daten/ajaxfunktionen.php?haendlernews=1&language=AT");
    }
    if ($(".firmennewsde").length > 0) {
        $(".firmennewsde").load("/ez/sitedesign/daten/ajaxfunktionen.php?firmennews=1&language=DE");
        $(".haendlernewsde").load("/ez/sitedesign/daten/ajaxfunktionen.php?haendlernews=1&language=DE");
    }
    if ($(".firmennewsch").length > 0) {
        $(".firmennewsch").load("/ez/sitedesign/daten/ajaxfunktionen.php?firmennews=1&language=CH");
        $(".haendlernewsch").load("/ez/sitedesign/daten/ajaxfunktionen.php?haendlernews=1&language=CH");
    }
    if ($("#meinemaschinen").length > 0) {
        $("#meinemaschinen").load("/ez/sitedesign/daten/ajaxfunktionen.php?meinemaschinen=1");
    }
    if ($("#meinemaschinenklein").length > 0) {
        $("#meinemaschinenklein").load("/ez/sitedesign/daten/ajaxfunktionen.php?meinemaschinen=2");
    }
    $("#firmentreffer").click(function () {
        $("#firmennewsinnenweitere").slideToggle("slow");
        $(this).hide("slow");
    });
    $(".lazy").lazyload({ skip_invisible: false, threshold: 200, failure_limit: 30 });
    $("#formularteil1 #text").maxlength();
    if ($(".loginklein").length) {
        $(".searchbox").hide();
    }
    $(".mobilesmenu,.abdunkelung").click(function () {
        $(this).toggleClass("is-active");
        $("#hamburger-icon").toggleClass("active");
        $(".mainnavigationNeu").toggleClass("show-menu");
        $(".abdunkelung").toggleClass("displaymenu");
        var windowheight = $(window).height();
        $(".mainnavigationNeu").height(windowheight);
    });
    var fullwidth = $("html").width();
    if ($("#firmennews").length) {
        $("#skybanner").hide();
    }
    $(".KleinanzeigenFormularNeu #submitbuttonklein").click(function (e) {
        e.preventDefault();
        $(this).attr("disabled", "disabled");
        $(this).prepend('<span class="fa fa-refresh fa-spin"></span>');
        $(".KleinanzeigenFormularNeu form").submit();
    });
    $(".payment-button").click(function (e) {
        $(this).attr("disabled", "disabled");
        $(this).prepend('<span class="fa fa-refresh fa-spin"></span>  ');
    });
    $(".agbcheckbox").on("click", function () {
        if ($(".agbcheckbox").prop("checked")) {
            $("#submitbuttonklein").removeAttr("disabled");
        } else {
            $("#submitbuttonklein").attr("disabled", "disabled");
        }
    });
    $("input[name='gewerblich']").on("change", function () {
        if (this.value == 1) {
            $(".nurfirmen").show();
        } else {
            $(".nurfirmen").hide();
        }
    });
    $(".checkboxgoup1").each(function () {
        var $this = $(this);
        $this.find("input:checkbox").click(function () {
            var group = "input:checkbox";
            $(".checkboxgoup3").find("input:checkbox").prop("checked", false);
            $this.find(group).not(this).attr("checked", false).prop("checked", false);
        });
    });
    $(".checkboxgoup2").each(function () {
        var $this = $(this);
        $this.find("input:checkbox").click(function () {
            var group = "input:checkbox";
            $(".checkboxgoup3").find("input:checkbox").prop("checked", false);
            $this.find(group).not(this).attr("checked", false).prop("checked", false);
        });
    });
    $(".checkboxgoup3").each(function () {
        var $this = $(this);
        $this.find("input:checkbox").click(function () {
            var group = "input:checkbox";
            $(".checkboxgoup1,.checkboxgoup2").find("input:checkbox").prop("checked", false);
            $this.find(group).not(this).attr("checked", false).prop("checked", false);
        });
    });
    if ($(".kleinanzeigenid").length > 0) {
        var kleinanzeigenid = $(".kleinanzeigenid").html();
        $(document).on("click", ".jetzteintragen", function () {
            if (fullwidth > 768) {
                $("#merkliste").load("/ez/sitedesign/daten/ajaxfunktionen.php?merklistekleinanzeigen=1&eintragen=1&offerid=" + kleinanzeigenid);
            } else {
                $("#merkliste-mobil").load("/ez/sitedesign/daten/ajaxfunktionen.php?merklistekleinanzeigen=1&eintragen=1&offerid=" + kleinanzeigenid);
            }
        });
        $(document).on("click", ".jetztaustragen", function () {
            if (fullwidth > 768) {
                $("#merkliste").load("/ez/sitedesign/daten/ajaxfunktionen.php?merklistekleinanzeigen=1&austragen=1&offerid=" + kleinanzeigenid);
            } else {
                $("#merkliste-mobil").load("/ez/sitedesign/daten/ajaxfunktionen.php?merklistekleinanzeigen=1&austragen=1&offerid=" + kleinanzeigenid);
            }
        });
        if (fullwidth > 768) {
            $("#merkliste").load("/ez/sitedesign/daten/ajaxfunktionen.php?merklistekleinanzeigen=1&offerid=" + kleinanzeigenid);
        } else {
            $("#merkliste-mobil").load("/ez/sitedesign/daten/ajaxfunktionen.php?merklistekleinanzeigen=1&offerid=" + kleinanzeigenid);
        }
    }
    $(".selectboxart1 input,.selectboxart2 input").on("click", function () {
        if ($("#art1:checked").val() == "1") {
            $(".texteingabekleinanzeigen").attr("placeholder", "Was verkaufen Sie? Beschreiben Sie das zu verkaufende Objekt!");
            $(".kosten").show();
            checkForAnimalCategory();
        }
        if ($("#art2:checked").val() == "2") {
            $(".texteingabekleinanzeigen").attr("placeholder", "Was suchen Sie? Beschreiben Sie das gesuchte Objekt!");
            $(".kosten").show();
            checkForAnimalCategory();
        }
    });
    if ($(".anmeldestatus").length >= 1) {
        var anmeldestatus = $(".anmeldestatus").html();
        if (anmeldestatus == 1) {
            $(".presentationsmoeglichkeit,.kostenbox").show();
        } else {
            $(".presentationsmoeglichkeit,.kostenbox").hide();
        }
    }
    if ($(".elementeditboxverstecken").length >= 1) {
        var elementstatus = $(".elementeditboxverstecken").html();
        if (elementstatus == 1) {
            $(".editboxkleinanzeige").hide();
        }
        $(".kleinanzeigesofortbearbeiten").on("click", function () {
            $(".editboxkleinanzeige").slideToggle();
            $(".kleinanzeigenvorschauelement").slideToggle();
            $(".kleinanzeigesofortbearbeiten").hide();
        });
    }
    $(".meinvorschlag").on("click", function () {
        $(this).hide();
    });
    $(".passbox").load("/ez/sitedesign/daten/ajaxfunktionen.php?emailboxpruefung=1&email=*");
    $(".KleinanzeigenFormularNeu #emailbox").blur(function () {
        var emailbox = encodeURI($(this).val());
        if (emailbox != "" && emailbox.indexOf("@") > -1 && emailbox.indexOf(".") > -1) {
            $.post("/ez/sitedesign/daten/ajaxfunktionen.php?emailboxpruefung=1&email=" + emailbox, function (data) {
                var currentContent = $(".passbox").prop("innerHTML");
                if (data == currentContent) {
                    return false;
                } else {
                    $(".passbox").html(data);
                }
            });
        }
    });
    var emailwertabfrage = $(".KleinanzeigenFormularNeu #emailbox").val();
    if (emailwertabfrage != "" && typeof emailwertabfrage !== "undefined") {
        $(".userpruefung").on("mouseenter", function () {
            var emailbox = encodeURI($(".KleinanzeigenFormularNeu #emailbox").val());
            $(".passbox").load("/ez/sitedesign/daten/ajaxfunktionen.php?emailboxpruefung=1&email=" + emailbox);
        });
    }
    $(document).on("click", ".vorschlageintrag", function () {
        var werteauslesen = $(this).attr("id");
        var arr = werteauslesen.split("_");
        $("#kat1").val(arr[1]);
        $("#katselectbox").load("/ez/sitedesign/daten/ajaxfunktionen.php?kleinanzeigenkat=1&katebene1=" + arr[1] + "&katebene2=" + arr[2]);
        $(".hiddenSubCatLabel").show();
    });
    if ($(".meinvorschlag").length > 0) {
        $("#header1neu").blur(function () {
            var classifiedTitle = encodeURI($("#header1neu").val());
            $(".meinvorschlag").load("/ez/sitedesign/daten/ajaxfunktionen.php?kategorievorschlag=1&classifiedTitle=" + classifiedTitle);
        });
    }
    $(".form-group #text").maxlength();
    if (fullwidth > 768) {
        $('[data-toggle="popover"]').popover();
    }
    $("#preisineuro").ForceNumericOnly();
    var seitenbreite = $(document).width();
    var path = window.location.pathname;
    var landingpage = path == "/" || path == "/ez/index.php" || path == "/ez/index.php/" ? true : false;
    if ($("#kleinanzeigenumgebung").length > 0 && seitenbreite >= 766 && !landingpage) {
        var katnummer = $("#katnummer").text();
        var umkreisbanner = $.cookie("umkreisbanner");
        if (umkreisbanner != "hiddentop" && umkreisbanner != "hiddenbottom") {
            var geocode = "&lat=48.184394&lng=14.269727";
            $("#kleinanzeigenumgebung").load("/ez/sitedesign/daten/ajaxfunktionen.php?kleinanzeigenumgebung=1" + geocode + "&katnummer=" + katnummer);
        } else {
            $("#kleinanzeigenumgebung").hide();
        }
        $(document).on("click", "#kleinanzeigenumgebung #umkreisx a", function () {
            $.cookie("umkreisbanner", "hiddentop", { expires: 350, path: "/" });
            $("#kleinanzeigenumgebung").hide();
        });
    }
    $("#headerbanner img, #footer img, .bilderanzeigen img, #bildinnen img, #contentleft img, #maincontent img").addClass("img-responsive");
    $("#contentartikel table").addClass("table table-striped");
    $(".carousel-inner .item").first().addClass("active");
    $("#allekategorienzeigen").click(function () {
        $("#allekagegorienbox").slideToggle("slow", function () {});
    });
    $("#allemonatezeigen").click(function () {
        $("#allemonatebox").slideToggle("slow", function () {});
    });
    var vwptWidth = $(window).width();
    if (vwptWidth < 758) {
        $(".bilddiashowklein a img").each(function (index, value) {
            var val = $(this).attr("data-original");
            $(this).parent().attr("href", val.replace("thumb", ""));
            $(this).parent().removeClass("thickbox").addClass("swipebox");
        });
    }
    $(".zoombild .swipebox").magnificPopup({ type: "image" });
    $(".flexslider,#contentartikel").magnificPopup({
        delegate: ".swipebox",
        type: "image",
        tLoading: "Bild wird geladen #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: { enabled: true, navigateByImgClick: true, preload: [0, 1] },
        image: {
            tError: "kein Bild vorhanden!.",
            titleSrc: function (item) {
                return item.el.attr("title");
            },
        },
    });
    $(document).on("click", ".flex-control-thumbs li img", function (e) {
        var index = $(this).data("lastValue");
    });
    var segmentcookie = $.cookie("meinesegment");
    if (typeof segmentcookie === "undefined" && segmentid != "") {
        $.cookie("meinesegment", "", { expires: 350, path: "/", domain: ".landwirt.com" });
        segmentcookie = $.cookie("meinesegment");
    }
    var arr = segmentcookie;
    var arrneu = arr ? arr.split(",") : "";
    var vorkommen = jQuery.inArray(segment, arrneu);
    if (vorkommen == -1 && typeof segmentcookie !== "undefined" && segmentid != "") {
        if ($.isArray(arrneu)) {
            arrneu.push(segment);
            arrneu.sort();
        } else {
            arrneu = new Array(segment);
        }
        $.cookie("meinesegment", arrneu, { expires: 350, path: "/", domain: ".landwirt.com" });
        segmentcookie = $.cookie("meinesegment");
        $("#footer").prepend("<div class='cookiesegement no'></div>");
        $(".cookiesegement").load("/ez/sitedesign/daten/ajaxfunktionen.php?segmentcookie=1");
    }
    if ($(window).width() > 750) {
        var wertcookie = $.cookie("meinekategorien");
        if (typeof wertcookie === "undefined") {
            $("#traktorm").prepend("<div id='meinekategorienbox'> </div>");
            $("#meinekategorienbox").load("/ez/sitedesign/daten/ajaxfunktionen.php?meinekategorienzeigen=1");
            $("#nichtmehrfragen").on("click", function () {
                $.cookie("meinekategorien", "displaynone", { expires: 350, path: "/" });
                $("#meinekategorienbox").fadeOut();
            });
            $("#suchboxtraktor select").on("change", function () {
                var select = $(this).val();
                $.cookie("meinekategorien", select, { expires: 350, path: "/" });
                $("#suchboxtraktor").load("/ez/sitedesign/daten/ajaxfunktionen.php?meinekategorienspeichern=1");
                $("#meinekategorienbox").delay(13000).fadeOut(500);
            });
        }
        $("#contentleftkat #boxleftlinks").show();
        $("#contentleftkat #hofladen").show();
    } else {
    }
    var arr = segmentcookie;
    var arrneu = arr ? arr.split(",") : "";
});
jQuery.fn.ForceNumericOnly = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            return key == 8 || key == 188 || key == 13 || key == 9 || key == 46 || (key >= 37 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105);
        });
    });
};
var translated = false;
function translateKleinanzeige(id, lang, existing) {
    if (existing === 0 && translated === true) {
        existing = 1;
    }
    if (existing === 1) {
        $("#description_translated,#translatedHeader").show().removeClass("hidden");
        $("#translateButton, #description_original,#kleinanzeigenTitle").hide();
    }
    if (existing === 2) {
        $("#description_translated,#translatedHeader,#kleinanzeigenTitle").hide();
        $("#translateButton, #description_original").show().removeClass("hidden");
    }
    if (existing === 0 && id > 0 && lang !== "") {
        $.ajax({ method: "POST", url: "/ez/sitedesign/daten/ajaxfunktionen.php", data: { translateKleinanzeige: 1, kleinanzeigenId: id, language: lang } })
            .done(function (msg) {
                if (msg !== 1 && msg !== 2) {
                    var translations = msg.split("||");
                    $("#description_translated").prepend(translations[0]);
                    $("#translatedHeader").prepend(translations[1]);
                    $("#description_translated,#translatedHeader").show().removeClass("hidden");
                    $("#translateButton, #description_original,#kleinanzeigenTitle").hide();
                    translated = true;
                }
            })
            .fail(function () {
                $("#description_translated").prepend("<div>This service is temporary unavailable. Please try again later.</div>");
                $("#description_translated").show().removeClass("hidden");
                $("#translateButton, #description_original").hide();
            });
    }
}
!(function (a) {
    (a.fn.equalHeights = function () {
        var b = 0,
            c = a(this);
        return (
            c.each(function () {
                var c = a(this).innerHeight();
                c > b && (b = c);
            }),
            c.css("height", b)
        );
    }),
        a("[data-equal]").each(function () {
            var b = a(this),
                c = b.data("equal");
            b.find(c).equalHeights();
        });
})(jQuery);
$(document).ready(sizeContent);
$(window).resize(sizeContent);
!(function (e) {
    var t = function (t, n) {
        (this.$element = e(t)), (this.type = this.$element.data("uploadtype") || (this.$element.find(".thumbnail").length > 0 ? "image" : "file")), (this.$input = this.$element.find(":file"));
        if (this.$input.length === 0) return;
        (this.name = this.$input.attr("name") || n.name),
            (this.$hidden = this.$element.find('input[type=hidden][name="' + this.name + '"]')),
            this.$hidden.length === 0 && ((this.$hidden = e('<input type="hidden" />')), this.$element.prepend(this.$hidden)),
            (this.$preview = this.$element.find(".fileupload-preview"));
        var r = this.$preview.css("height");
        this.$preview.css("display") != "inline" && r != "0px" && r != "none" && this.$preview.css("line-height", r),
            (this.original = { exists: this.$element.hasClass("fileupload-exists"), preview: this.$preview.html(), hiddenVal: this.$hidden.val() }),
            (this.$remove = this.$element.find('[data-dismiss="fileupload"]')),
            this.$element.find('[data-trigger="fileupload"]').on("click.fileupload", e.proxy(this.trigger, this)),
            this.listen();
    };
    (t.prototype = {
        listen: function () {
            this.$input.on("change.fileupload", e.proxy(this.change, this)), e(this.$input[0].form).on("reset.fileupload", e.proxy(this.reset, this)), this.$remove && this.$remove.on("click.fileupload", e.proxy(this.clear, this));
        },
        change: function (e, t) {
            if (t === "clear") return;
            var n = e.target.files !== undefined ? e.target.files[0] : e.target.value ? { name: e.target.value.replace(/^.+\\/, "") } : null;
            if (!n) {
                this.clear();
                return;
            }
            this.$hidden.val(""), this.$hidden.attr("name", ""), this.$input.attr("name", this.name);
            if (this.type === "image" && this.$preview.length > 0 && (typeof n.type != "undefined" ? n.type.match("image.*") : n.name.match(/\.(gif|png|jpe?g)$/i)) && typeof FileReader != "undefined") {
                var r = new FileReader(),
                    i = this.$preview,
                    s = this.$element;
                (r.onload = function (e) {
                    i.html('<img src="' + e.target.result + '" ' + (i.css("max-height") != "none" ? 'style="max-height: ' + i.css("max-height") + ';"' : "") + " />"), s.addClass("fileupload-exists").removeClass("fileupload-new");
                }),
                    r.readAsDataURL(n);
            } else this.$preview.text(n.name), this.$element.addClass("fileupload-exists").removeClass("fileupload-new");
        },
        clear: function (e) {
            this.$hidden.val(""), this.$hidden.attr("name", this.name), this.$input.attr("name", "");
            if (navigator.userAgent.match(/msie/i)) {
                var t = this.$input.clone(!0);
                this.$input.after(t), this.$input.remove(), (this.$input = t);
            } else this.$input.val("");
            this.$preview.html(""), this.$element.addClass("fileupload-new").removeClass("fileupload-exists"), e && (this.$input.trigger("change", ["clear"]), e.preventDefault());
        },
        reset: function (e) {
            this.clear(),
                this.$hidden.val(this.original.hiddenVal),
                this.$preview.html(this.original.preview),
                this.original.exists ? this.$element.addClass("fileupload-exists").removeClass("fileupload-new") : this.$element.addClass("fileupload-new").removeClass("fileupload-exists");
        },
        trigger: function (e) {
            this.$input.trigger("click"), e.preventDefault();
        },
    }),
        (e.fn.fileupload = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("fileupload");
                i || r.data("fileupload", (i = new t(this, n))), typeof n == "string" && i[n]();
            });
        }),
        (e.fn.fileupload.Constructor = t),
        e(document).on("click.fileupload.data-api", '[data-provides="fileupload"]', function (t) {
            var n = e(this);
            if (n.data("fileupload")) return;
            n.fileupload(n.data());
            var r = e(t.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');
            r.length > 0 && (r.trigger("click.fileupload"), t.preventDefault());
        });
})(window.jQuery);
function getInternetExplorerVersion() {
    var rV = -1;
    if (navigator.appName == "Microsoft Internet Explorer" || navigator.appName == "Netscape") {
        var uA = navigator.userAgent;
        var rE = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        if (rE.exec(uA) != null) {
            rV = parseFloat(RegExp.$1);
        } else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            rV = 11;
        }
    }
    return rV;
}
var fullwidth = $("html").width();
function checkForAnimalCategory() {
    var currentCategory = parseInt($("#kat1").val(), 10);
    var currentSubCategory = parseInt($("#kat").val(), 10);
    var animalCategories = [18, 74];
    var animalSubCategories = [65, 186, 488, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515];
    if (currentCategory === 18 && isNaN(currentSubCategory)) {
        currentSubCategory = 141;
    }
    if (currentCategory === 74 && isNaN(currentSubCategory)) {
        currentSubCategory = 488;
    }
    if (animalSubCategories.indexOf(currentSubCategory) !== -1 && animalCategories.indexOf(currentCategory) !== -1 && !isNaN(currentSubCategory) && $("#art2:checked").val() !== "2") {
        $("#animalNotice").slideDown();
    } else {
        $("#animalNotice").slideUp();
    }
}
function sizeContent() {
    var fullwidth = $("html").width();
    var fullheight = $(window).height();
    if (fullwidth > 1030) {
        var restwidth = fullwidth - 1030;
        $(".adform-adbox").css("width", restwidth);
    }
    if (fullwidth < 750) {
        if ($("#kleinanzeigenausgabeliste,.kleinanzeigenrootline").length > 0) {
            $("#kleinanzeigenausgabeliste,.kleinanzeigenrootline").append(
                '<div class="KLeintragen fixbottom"><a href="/ez/index.php/kleinanzeigen/aufgeben/"><img src="/assets/img/kameraplus.png" width="46" height="46" alt="Kleinanzeigen aufgeben" loading="lazy"></a></div>'
            );
        }
        $(document).on("click", ".bilduploaderbox1", function () {
            $(".bilduploaderbox2,.bilduploaderbox3,.bilduploaderbox4,.bilduploaderbox5,.bilduploaderbox6,.bilduploaderbox7,.bilduploaderbox8,.bilduploaderbox9").show();
        });
        $(document).on("click", ".presentheader", function () {
            $(".mobilverstecken,.present1,.present2,.present3").show();
        });
    }
    var titelheight = 0;
    var titelheight_old = 0;
    var iEVersion = getInternetExplorerVersion();
    if (iEVersion != -1) {
    } else {
        $(".sameheight").each(function (index) {
            titelheight = $(this).innerHeight();
            if (titelheight >= titelheight_old) {
                titelheight_old = titelheight;
            }
        });
        $(".sameheight").innerHeight(titelheight_old);
        var titelheight = 0;
        var titelheight_old = 0;
        $(".sameheightkleinanzeigen").each(function (index) {
            titelheight = $(this).innerHeight();
            if (titelheight >= titelheight_old) {
                titelheight_old = titelheight;
            }
        });
        $(".sameheightkleinanzeigen").innerHeight(titelheight_old);
    }
}
function sendCouponCode() {
    var couponcode = $("#couponCode").val();
    var letters = /^[0-9a-zA-Z]+$/;
    if (couponcode.length > 15 || couponcode.length < 4 || !couponcode.match(letters)) {
        $("#couponError").html("Der eingegebene Gutscheincode ist falsch. Bitte prüfen Sie Ihre Eingabe.");
        return;
    }
    $.post("/ez/sitedesign/daten/ajaxfunktionen.php", { couponcheck: 1, coupon: couponcode }, function (data, status) {
        if (data == 0) {
            $("#couponError").html("Der eingegebene Gutscheincode ist falsch. Bitte prüfen Sie Ihre Eingabe.");
        } else if (data == 1) {
            $("#couponError").html("Der eingegebene Gutscheincode wurde bereits verwendet.");
        } else if (data == 2) {
            $("#couponError").html("Sie haben bereits einen Gutschein verwendet.");
        } else {
            $("#couponError").html("Der Gutschein wurde eingelöst!");
            $("#classifiedPrice").html(data);
        }
    });
}
