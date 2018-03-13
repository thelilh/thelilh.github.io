function UpdateImage() {
    'use strict';
    var o1, o2, o3, o4, o5, o6, o7, o8, uwumode, board, t1, t2, t3, t4, yougot;
    o1 = document.getElementById("po1"); /* Do you like to program? */
    o2 = document.getElementById("po2"); /* Do you like to program? */
    o3 = document.getElementById("mo1"); /* Do you want someone to be your master? */
    o4 = document.getElementById("mo2"); /* Do you want someone to be your master? */
    o5 = document.getElementById("no1"); /* Are you shocked by seeing people naked? */
    o6 = document.getElementById("no2"); /* Are you shocked by seeing people naked? */
    o7 = document.getElementById("go1"); /* Do you like guns? */
    o8 = document.getElementById("go2"); /* Do you like guns? */
    board = document.getElementById("board");
    uwumode = document.getElementById("uwumode");
    t1 = document.getElementById("title1");
    t2 = document.getElementById("title2");
    t3 = document.getElementById("title3");
    t4 = document.getElementById("title4");
    yougot = document.getElementById("yougot");
    
    board.src = "board.png";
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board8.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You are pretty normal uwu";
                    } else {
                        yougot.innerHTML = "You got: Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === false && o6.checked === true) {
                    board.src = "board8.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You are pretty normal uwu";
                    } else {
                        yougot.innerHTML = "You got: Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board8.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You are pretty normal uwu";
                    } else {
                        yougot.innerHTML = "You got: Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === false && o6.checked === true) {
                    board.src = "board8.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You are pretty normal uwu";
                    } else {
                        yougot.innerHTML = "You got: Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board7.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to program uwu";
                    } else {
                        yougot.innerHTML = "You got: Techie";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board6.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to program and to >///<";
                    } else {
                        yougot.innerHTML = "You got: Prude Techie";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board5.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to >///<";
                    } else {
                        yougot.innerHTML = "You got: Prude Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board4.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns and to >///<";
                    } else {
                        yougot.innerHTML = "You got: Prude Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board3.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns uwu";
                    } else {
                        yougot.innerHTML = "You got: Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === false && o6.checked === true) {
                    board.src = "board2.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns and daddy/mommy uwu";
                    } else {
                        yougot.innerHTML = "You got: Slut Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === false && o6.checked === true) {
                    board.src = "board1.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to program and your daddy/mommy uwu";
                    } else {
                        yougot.innerHTML = "You got: Slut Techie";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === false && o6.checked === true) {
                    board.src = "board9.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like your daddy/mommy uwu";
                    } else {
                        yougot.innerHTML = "You got: Slut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board3.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns uwu";
                    } else {
                        yougot.innerHTML = "You got: Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board3.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns uwu";
                    } else {
                        yougot.innerHTML = "You got: Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === false && o6.checked === true) {
                    board.src = "board9.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like your daddy/mommy uwu";
                    } else {
                        yougot.innerHTML = "You got: Slut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === true && o6.checked === false) {
                    board.src = "board5.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to >///<";
                    } else {
                        yougot.innerHTML = "You got: Prude";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === false && o6.checked === true) {
                    board.src = "board7.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to program uwu";
                    } else {
                        yougot.innerHTML = "You got: Techie";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === false && o6.checked === true) {
                    board.src = "board3.png";
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns uwu";
                    } else {
                        yougot.innerHTML = "You got: Gun Nut";
                    }
                }
            }
        }
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (o7.checked === false && o8.checked === false) {
        o7.scrollIntoView();
        document.getElementById("title4").classList.add("red");
    } else {
        document.getElementById("title4").classList.remove("red");
    }
    if (o5.checked === false && o6.checked === false) {
        o5.scrollIntoView();
        document.getElementById("title3").classList.add("red");
    } else {
        document.getElementById("title3").classList.remove("red");
    }
    if (o3.checked === false && o4.checked === false) {
        o3.scrollIntoView();
        document.getElementById("title2").classList.add("red");
    } else {
        document.getElementById("title2").classList.remove("red");
    }
    if (o1.checked === false && o2.checked === false) {
        o1.scrollIntoView();
        document.getElementById("title1").classList.add("red");
    } else {
        document.getElementById("title1").classList.remove("red");
    }
}
function UpdateRadio() {
    'use strict';
    var o1, o2, o3, o4, o5, o6, o7, o8, l1, l2, l3, l4, l5, l6, l7, l8, uwumode, board, t1, t2, t3, t4;
    o1 = document.getElementById("po1");
    o2 = document.getElementById("po2");
    o3 = document.getElementById("mo1");
    o4 = document.getElementById("mo2");
    o5 = document.getElementById("no1");
    o6 = document.getElementById("no2");
    o7 = document.getElementById("go1");
    o8 = document.getElementById("go2");
    l1 = document.getElementById("l1");
    l2 = document.getElementById("l2");
    l3 = document.getElementById("l3");
    l4 = document.getElementById("l4");
    l5 = document.getElementById("l5");
    l6 = document.getElementById("l6");
    l7 = document.getElementById("l7");
    l8 = document.getElementById("l8");
    board = document.getElementById("board");
    uwumode = document.getElementById("uwumode");
    t1 = document.getElementById("title1");
    t2 = document.getElementById("title2");
    t3 = document.getElementById("title3");
    t4 = document.getElementById("title4");
    if (o1.checked === false) {
        l1.src = "yes_deactive.png";
    } else {
        l1.src = "yes_active.png";
    }
    if (o2.checked === false) {
        l2.src = "no_deactive.png";
    } else {
        l2.src = "no_active.png";
    }
    if (o3.checked === false) {
        l3.src = "yes_deactive.png";
    } else {
        l3.src = "yes_active.png";
    }
    if (o4.checked === false) {
        l4.src = "no_deactive.png";
    } else {
        l4.src = "no_active.png";
    }
    if (o5.checked === false) {
        l5.src = "yes_deactive.png";
    } else {
        l5.src = "yes_active.png";
    }
    if (o5.checked === false) {
        l5.src = "yes_deactive.png";
    } else {
        l5.src = "yes_active.png";
    }
    if (o6.checked === false) {
        l6.src = "no_deactive.png";
    } else {
        l6.src = "no_active.png";
    }
    if (o7.checked === false) {
        l7.src = "yes_deactive.png";
    } else {
        l7.src = "yes_active.png";
    }
    if (o8.checked === false) {
        l8.src = "no_deactive.png";
    } else {
        l8.src = "no_active.png";
    }
    if (uwumode.checked === true) {
        t1.innerHTML = "Nyaa, do you like to program uwu";
        t2.innerHTML = "Do you have any daddies or mommies uwu";
        t3.innerHTML = "Do you often >///<";
        t4.innerHTML = "Are guns cool uwu";
    } else {
        t1.innerHTML = "Do you have an knowledge of any programming language?";
        t2.innerHTML = "Do you have an sexual fantasies that may be out of the 'normal' for some? (i.e wanting to be someone's master)";
        t3.innerHTML = "If someone was standing naked in front of you, would you be scared? (if you know the person, not some random person)";
        t4.innerHTML = "Do you currently own a firearm or do you want to own a firearm?";
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You are pretty normal uwu";
                    } else {
                        yougot.innerHTML = "You got: Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === false && o6.checked === true) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You are pretty normal uwu";
                    } else {
                        yougot.innerHTML = "You got: Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You are pretty normal uwu";
                    } else {
                        yougot.innerHTML = "You got: Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === false && o6.checked === true) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You are pretty normal uwu";
                    } else {
                        yougot.innerHTML = "You got: Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to program uwu";
                    } else {
                        yougot.innerHTML = "You got: Techie";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to program and to >///<";
                    } else {
                        yougot.innerHTML = "You got: Prude Techie";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to >///<";
                    } else {
                        yougot.innerHTML = "You got: Prude Neutral";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns and to >///<";
                    } else {
                        yougot.innerHTML = "You got: Prude Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns uwu";
                    } else {
                        yougot.innerHTML = "You got: Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === false && o6.checked === true) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns and daddy/mommy uwu";
                    } else {
                        yougot.innerHTML = "You got: Slut Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === false && o6.checked === true) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to program and your daddy/mommy uwu";
                    } else {
                        yougot.innerHTML = "You got: Slut Techie";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === false && o6.checked === true) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like your daddy/mommy uwu";
                    } else {
                        yougot.innerHTML = "You got: Slut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns uwu";
                    } else {
                        yougot.innerHTML = "You got: Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns uwu";
                    } else {
                        yougot.innerHTML = "You got: Gun Nut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === true && o4.checked === false) {
                if (o5.checked === false && o6.checked === true) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like your daddy/mommy uwu";
                    } else {
                        yougot.innerHTML = "You got: Slut";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === true && o6.checked === false) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to >///<";
                    } else {
                        yougot.innerHTML = "You got: Prude";
                    }
                }
            }
        }
    }
    if (o1.checked === true && o2.checked === false) {
        if (o7.checked === false && o8.checked === true) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === false && o6.checked === true) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like to program uwu";
                    } else {
                        yougot.innerHTML = "You got: Techie";
                    }
                }
            }
        }
    }
    if (o1.checked === false && o2.checked === true) {
        if (o7.checked === true && o8.checked === false) {
            if (o3.checked === false && o4.checked === true) {
                if (o5.checked === false && o6.checked === true) {
                    if (uwumode.checked === true) {
                        yougot.innerHTML = "You like guns uwu";
                    } else {
                        yougot.innerHTML = "You got: Gun Nut";
                    }
                }
            }
        }
    }
}