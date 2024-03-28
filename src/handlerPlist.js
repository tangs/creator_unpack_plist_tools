var path = require("path");
const file = require("fs");

var BASE64_KEYS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var BASE64_VALUES = new Array(123); // max char code in base64Keys
for (let i = 0; i < 123; ++i) BASE64_VALUES[i] = 64; // fill with placeholder('=') index
for (let i = 0; i < 64; ++i) BASE64_VALUES[BASE64_KEYS.charCodeAt(i)] = i;

var Base64Values = BASE64_VALUES;

var HexChars = "0123456789abcdef".split("");

var _t = ["", "", "", ""];
var UuidTemplate = _t.concat(_t, "-", _t, "-", _t, "-", _t, "-", _t, _t, _t);
var Indices = UuidTemplate.map(function (x, i) {
  return x === "-" ? NaN : i;
}).filter(isFinite);

/**
 * 
 * @param {string} base64 
 * @returns
 */
function decodeUuid(base64) {
  if (base64.length !== 22) {
    return base64;
  }
  UuidTemplate[0] = base64[0];
  UuidTemplate[1] = base64[1];
  for (var i = 2, j = 2; i < 22; i += 2) {
    var lhs = Base64Values[base64.charCodeAt(i)];
    var rhs = Base64Values[base64.charCodeAt(i + 1)];
    UuidTemplate[Indices[j++]] = HexChars[lhs >> 2];
    UuidTemplate[Indices[j++]] = HexChars[((lhs & 3) << 2) | (rhs >> 4)];
    UuidTemplate[Indices[j++]] = HexChars[rhs & 0xf];
  }
  return UuidTemplate.join("");
}

//https://static.pgf-asw0zz.com/68/assets/resources/config.f6cf4.json

let uuids = [
  "07ZfypnglHCpDa0t+LqAl0",
  "07xJ5jvc9PqrCa9U6xqd5d",
  "08drKMBi1PhaauOCyUoE3L",
  "0bPsHbHPZB9IHDv8IQiJi+",
  "0ezEADkmBMr6YT5Hcibpum",
  "0e3ENr5MhJO5DTCjrvWCCY",
  "0fS8xL+zNMjqibO7k3c5Ze",
  "0fpaukCsFLj4Oj/w5pJIR1",
  "0f1OY/0DxD/KMLooWZvG+p",
  "10yJ0/589HEa/qd6S9g3ij",
  "11kpbxKGpK1YeCmJvMrW/5",
  "11mLAZAMNJvYWpIwAGoRh9",
  "1ap82ZCLRJQb2h+DcqcqRJ",
  "1b0X2zu6dEYJ2ekKNgG06s",
  "1foegoEy5NE48JbWRN/CL0",
  "22lqnZQStKwbp2itKv/jia",
  "222Ue/7HtJDapl3prODP/d",
  "254C+wO6hOaLMETG94v8CE",
  "27XxiVY5hMhb0jsTvrqmKQ",
  "27qlXi3qNNNZwwZpd9F+ec",
  "2cjFSyjFdD7pH9vlBSdk79",
  "30UcjoOrNE/aYfhosHL+Ha",
  "31tDZxlrBAMpJvSC5RmZkn",
  "31wwJ80e9No5UAib8qp0Xr",
  "36c3bdBEFIpbaimkDqGWHe",
  "3dwVvssHBLyK8FlNgMjOnA",
  "3e/d5bFHVGDIJ7hSi5zzbH",
  "417tp5exZNa5iuyOf08vrK",
  "42D4V5PZRPsYNHX1DgmaRR",
  "4a6VleW/NHCYs5Dp48t5eu",
  "4btGkYGMFP75dSgsZCZM+O",
  "4fwm2bv/pDcbqQM7NLbXMw",
  "51ONkHE5ZGGqGBVAXJa9Ky",
  "51wZwf1QpDvqovkpuUyK3g",
  "55SVs6+3BKtKvSJJG4xo2J",
  "56sRuazaVIgY6VXTLNgnRK",
  "59buctZOhDFavotAY6vdw8",
  "5a5ovRdaRLGK5DuhkME2ct",
  "5dhIbpn/pIZYZzEcJmo4gi",
  "5dk3IO/N9ICKcbnICPwcRu",
  "5dw0IXA2REM7ZeeCMlI4m6",
  "5d0LZfuklAZKYWUZtK1T3F",
  "5fqgqHi99E47sfWw9xyLOp",
  "61p89vxrdI2pOCCbHrTkmM",
  "62+vpT2CRImaJW74kwBhpa",
  "64dUD7CqRLL7uoyUFyEKqX",
  "64l+TE255Mb4YIbtr5vMaU",
  "6abKNhkYdAOYDW2ttBh/ml",
  "6ftR7oKx1EOpqy8kS8YJ5J",
  "73FHG8Q7JPV4zGpMBWEmAf",
  "73tULYH41JvpYzLwhm+ddm",
  "755QemO8VKoYn/j8Mchu8M",
  "7afoYF33NE/rFXO/kn0RJA",
  "7dTrg/iq1KrZKM3lcgVlfV",
  "80F1XHjzlIN5b/FO4c7RV0",
  "86YuhkkGlMGq1MaxQWX2AS",
  "86eYVG2f1Ie6hu+3/LRVxm",
  "873A4cFnFJLJt+4yk8kDod",
  "873OkQSWVMYI2sOjIYfPfk",
  "8dQz7gkPNNaahYZ8JS6gup",
  "8fBVrPdoRGAb6AhM76ioRZ",
  "91Z4gDwjVFupYIfewss/yz",
  "945+QGnwZCZoMMDpLM+3DA",
  "960HbxiDBAxL5CaxA2sxjF",
  "97oIezCItLhrLEKseXPEgo",
  "a0PoqT6p1LA4t/JT3G9ozp",
  "a0emHyPaVA67szpITHEsY7",
  "a1+s0DCBZG/r5RGHwJgg15",
  "a6+5wvuV1E3I9GjVqGUr13",
  "aaugnZ4s1PepeBaS0Lxh0N",
  "abHLU5npVNZqhEHRrXntqu",
  "b0o37cN7FPrKFA5LSr+Paf",
  "b1DLam5bZEm4CjXcN8mVXv",
  "b39UQZTm1MK54tkiupMdos",
  "b4YIsFwUdDBrjiPw8FMZH4",
  "b5ALyr4+pC37o52Dw0w13z",
  "b86orviJBPIrZADWzTzYcp",
  "b9XpqVWQJPq7GhyUIQcBoy",
  "b97BmelrlAHZ+vgS1E1aCx",
  "b97U4J1AdNrLvGpe/nV4YS",
  "bc0DxX1FdBy4b1XVPrFt10",
  "bdPTRXci5IWLggS8P3PxY8",
  "bep+FBrW1JvaHkExk+/726",
  "bfxVlkzHRJPJs8591BocBx",
  "c0JB5HR0dBmJ6hv4u4SB5r",
  "c1q7mOci1HRYke1dxU6vXm",
  "c2pIeQzZJOH58W8PFcvAXs",
  "c4RaLSDeZF5b0r/jK7Z1+f",
  "c5EOEAAyFDPZzKyL/NufNh",
  "c7HP/Q681J4LZ6CNNk21Bk",
  "c9rmRs/x5Dd6FxLkf8T74s",
  "caMrxzlApH27hW1WCdw9ah",
  "cajCljDklM6bPbq0MEqPxi",
  "ccpU8ynuBNerWhUhcEILQG",
  "cfeF6p10xNyZMuSQhlFrQF",
  "d0TZJXuUZMu7O/UDk1TLN3",
  "d0niafeBNBhac0tMSpwKho",
  "d2SS3scrZN54MP+GnlUmvI",
  "d5r/BC9ahLRIzDYH5f1NSx",
  "dcLIQpB1JDPpfn8mAt5/k4",
  "dfofyOWTRPmoab6aW0nxHZ",
  "dfzXUOmNZMnIvpm4JI4hCM",
  "e0mkP07sFC4L0CBAOHdw3B",
  "e1M0wzgnBBY6tntCwFIlIK",
  "e1OyfrZ+pJOpK3x76y37Sl",
  "e8UgVCt/dNBayd6rDOX+/+",
  "ebkPmZSGRHcZvEkw10HPun",
  "f4pg79unZCvL9ahCKHqGB1",
  "f81OCpSwBCo4esuVPDUtOA",
  "f9pOc3dIdAu5nBKBSHCBZA",
  "f9psmZFgNPFqZnfiFYDtLw",
  "feUE5t00FOUrz1KiIeLM6V",
  "feaCZNyWNIjrlYO2reZZOG",
  "fe3OK8he5OU6Lzq+0Rkkr4",
  "02DRQNUERIPbZPG4qMiPLG",
  "026dRNTCRExpTzDzDaUWRC",
  "03QEQiHqhPLrQE0HXRDaE2",
  "0357Ve0LNMabuTI+6/DWB4",
  "05cM49Jd5IPpWsETPQc4tg",
  "05cQt2YYBI1KYNU5mpPhwc",
  "08TaJZFSFCTpKM6/2/8Pyp",
  "08e5JEOMlPNL3sQN83nVrl",
  "0brvAGgAhCQZdRjiomi7AH",
  "0c14BRZl1MOpZSdfTEUfKe",
  "0dSc2wPV9BTp70XqAZZJUX",
  "0do8ee5axEr4wVXlUiD4GS",
  "0efVkiICpCX4AX7EZs/Pti",
  "0eo9RKvvtOsJttXvMZKJgN",
  "0f2LBkohRIyL6EbOV61kzY",
  "10Fc9YrPdIJ5t+2OC02JEt",
  "10vgLhkVlPyai2tzUjJudx",
  "17MsA+5CtIF4/cbSpu+C2a",
  "17TCiAhJZBkKAiGmFJWAOq",
  "17mGLkk/dCRYxKozVcBQSX",
  "1aVUjI/8xPcJNrT3CzrIlT",
  "1a4Ls1X19M477cZ5ZpDVTJ",
  "1bBihysbNNmJXlBVirm5QS",
  "1cT87+9+lLTJyQF0zH4CLN",
  "1dfmTFHexCxpeSh2HrcwrL",
  "1d8Bdt6D5InIIxt5fPlF8F",
  "1fTotVjV9GoaMk0DWIP2YO",
  "22gpPiFL9L37CT0qDNokPT",
  "23J1DcvTVF7ZIC/p8dt5Ub",
  "26a0XkUZtBDIIFZcQHFQYn",
  "26/024mxFCzKISDhbuA+af",
  "27JGxfboVK/ZgeD2eYdkqz",
  "27OKpY16NCU4xWpDSxorJZ",
  "29xmoFS9dLb7aQs8werFUT",
  "2cE3B4QgZDkauMBmNCQ8sm",
  "2f6XVPZ/hNtJYXbYKJWWhy",
  "31hTc24/BLKrayWKR1AloC",
  "318wV1JVdEMbSHbWBOJgYe",
  "33fyM8FRJK9q4Z3u9NWrzM",
  "34/IiVdjZBVZCLBTizMd+f",
  "36EPtad/dAvrGgpC+CIA5l",
  "38nYif4llBhr76k5PgWibk",
  "393E3xGRJB6JlOeZ1lhWR0",
  "3aCYHT41ZG7rf+WsUlzTN8",
  "3e+1l/5lFKmLraCdbPnh96",
  "41EkgFw7hC2ZPn9/PUuVK/",
  "42Jm0++sBKOK7O/gy/BCh0",
  "42frd7oVdDg6Gy7Fsql4Mu",
  "43V0zQAztJioJkuE5b55nS",
  "45nfcQlwZBroRbj+43njGb",
  "46VD+OqHBL25NYwRpwLs6L",
  "47ovS8HGZJdaw9sBDSyxOS",
  "484KNHTaNDfrM+lf3kJyBr",
  "4bG3RaKv5GqYcLGeHmrpBY",
  "4dW5S6jDhFkLj18hhHv71j",
  "50PRYpKC9Nj5HdPYruLF2w",
  "50dg2jVQRJrJ6Cg+4YsF/Q",
  "54aZ6wfFdBEIRc4xTVWuoy",
  "54j8qq+nlG0LCDFR9yImpG",
  "56kjfRWPZGEbStPVHJZCUa",
  "56l04PDB1DIIB9o9ywJFw0",
  "56vqTG2bdK75URsopobb3n",
  "579bY6WthFJKSVlPWi4eDs",
  "59juQbxqxLMqN5BFcqaLqV",
  "5cOGtykqpJ667YFEBVJ6RO",
  "5dy4KKf6NFkZND7q9FLd2d",
  "61x2fVDDpD56bR7CIq57Ct",
  "632MF1jC9Ctbhi6DcaVyfg",
  "64UqSFMFhHcrLN36XiShtD",
  "644sxvlLlMGJ8YBAUZpHBi",
  "67hChEqgxNobV3S4Efs+Ja",
  "68QLS0s25G/owqXTPyMoKo",
  "694IAFkX1Nc5WtRXiVOo/m",
  "6bA+4w2NJFCZ7L4jEXGPAT",
  "6bXKgFafBJ7qPBzzT4s3h+",
  "6eX1vHPz1Ppr545GRdbGax",
  "6fh21waMBG5ar5lo1N39Ak",
  "6ftqHJXepHgJ2xBYSyqTZP",
  "6f3MPyRutJdLk5FXaoEVbc",
  "70PIya/NNG17qNuhlwjGAr",
  "72CnlEXh9ETao5vF+oETgW",
  "73xtl+bzVAN4q2K/fwxC6N",
  "747oP2DiRCGKlnMdj8cCAj",
  "75uL6mrWBEb7TB3Kdkr43W",
  "76AB88gupIzrH0MvJA0PqA",
  "76QtsE5MhP17o1wrHzojju",
  "76e69cd9JNwJW3lQR6Epir",
  "78l2x3JzFI6ZLVuVvMOL0P",
  "7aHVNu5DNGgaZhVdUdPrcR",
  "7bR0PPWv9J+64Eu+m6Q3He",
  "7dahDmuthHwowrSARcBgDu",
  "7duqao2sFMAYMRPDa6ABzH",
  "7eIXa4CpxIu4pq9jsTOyeH",
  "7e7LzjlxxOg7WRfNE+iuD4",
  "81AkXT/lVMqIX2LzvVSoDR",
  "84CHnQU1dAj7xbT4ZQU+EF",
  "85A/y2AKVFJJ6BdUsEVoGw",
  "86zbfGB9pFkZxdB6y39Ei1",
  "869p9v/ApHd5cA6arPbPQY",
  "879q9vbdFE7b9UXnMp4Sii",
  "88MrlSEvRInrk0Kh47tk0Y",
  "8aOyAPfRdCHK67ROlTPjVp",
  "8cG8xPH3xC5IzTX7bm50eg",
  "8c/lQHZGtJHLAxtlC3JuvG",
  "8dQW3EMT1C+YAtQ/FUGmfq",
  "8eGAtiwnVHoLw83DzD/LMb",
  "8esyLCwPlDG7q9DvBR8ZsN",
  "8fhAocdhJJILtQtZm0GxVU",
  "90HKfczlhO+KFQUpIgHAVl",
  "90id6CakRNPJW1DUudF+lN",
  "94N3rsiglAub2x9AdSshtn",
  "95Duaf8flBjrJF7bIIOD36",
  "95Q0wYoA9E9pqXcr7Vbry4",
  "95cJGeRlpAjIvYVmMMJwYm",
  "95gOPzwnlE+o4wdzZRTEzR",
  "99R5NHHthERb5ocai7hBfv",
  "9cpeJY8NtGlo2Iz7+hPAmk",
  "9fVBiDystBSKFOKcl8MSk/",
  "9f91nz6mhAzrPCNpRyJmRt",
  "a3oflmT1RDn67GuFwpRg8V",
  "a465B1mTBI3rT7k2H7Lvkc",
  "a8NGW0Iz5FmoYtp2wWEMdw",
  "aafsR/5y5I44u/MH5euvN6",
  "ablIS9P4VJn40J2sVTxaW3",
  "acmyqR7ohL+aoSntrsq4o3",
  "acti3CIXVEUrzTPaqoNyi5",
  "aeCJ7K7+hHY61TOgFtBC9h",
  "aehRTVPVNHfJ+I3C8T1eE5",
  "aft1qqtwJMpLKrObqsadOS",
  "b1TZe51ZNIq7FNPihhv2s7",
  "b2xCWA5edC6qr7bo4xjFIH",
  "b3vVH+QB5AgZ4+0P86tWIb",
  "b4DwxzRIpMBr+WhI862a3y",
  "b8al7+18VFPrl7Wpwtmlk8",
  "b9ZbRiO1BDsLeZTwo8Ic8D",
  "b9dpkOT41KPIgonyxzoMAQ",
  "b9+bifD2hKHbA3BqrVj03J",
  "bbnSxTdtJMC5ScsXdZkF1P",
  "bbqe5PDV5KZbFjuKfKPyQ5",
  "bbrw03HulIMoSBStD5g5JO",
  "bdVzb8341HO5RSqGy4JgSl",
  "beMsy7aVtNOJDVPOoOMjqT",
  "bfoFb5eohHoYcQtn0XQ85B",
  "bfsP5QKB9A1YFM0zJ2iRn/",
  "bf5Nikv9dO1I6udsDti50h",
  "c06XqfSOJK3Il3etpSC9kx",
  "c1hHeeQE9HiKEazIUIRLuc",
  "c2Jmi3BXFGkqcqVAqHyNsd",
  "c3adM6ZK5N6K7pbU8kx/24",
  "c3ytrgSltFF6os9uyuXTvp",
  "c30yuZgVZP3qZ1sbWLBx1D",
  "c4SRzEdVxAk4tSp6uRqZgt",
  "c4mnEZNmVD2q8ibELZ5qGd",
  "c5eNMU0HxKTpVjZlimLRqJ",
  "c57EHtY6lA5YfHB3/Qv9Fe",
  "c6kvKQzSJHdJR5p5EnPE48",
  "c8mFGmyZdDK6rOhQbB6JGU",
  "c80I1RqL5NoaRxt+/yrOqy",
  "c8+NoWfZZIb7l41lo47XF3",
  "cacE+B5WZKjqjiKdGL3sXt",
  "caslYAHqhB45d4ncllfbvb",
  "cb0aT+y8JKQ5AGSlXgd1sK",
  "cdBANGEO9AxppkjsqUe/06",
  "ceAyAeTSxFKoJttithdYHu",
  "d0LFxxjOVEm6qiJr+u1Sbt",
  "d2LLeSmuZG5blJncScSHoI",
  "d4t4WV3+dCXY8N2AXlRTBp",
  "d6h3uYavJIarQdfPmBRA8f",
  "d61PGZvbVIm6R458PXS9wQ",
  "d7s0qAZFRMI5aRLMXQE+Zr",
  "d71LTcw2BAK7WsJ1SZDcpp",
  "deFKBjo3RCTbhVGuskggIZ",
  "dfzoz27NJPK6dG2GxfeNRy",
  "e0UeQn5lVNGIl6GDpgKMfb",
  "e4Rk7P4vdJArvCmJMRV1B9",
  "e6AWust4hINZ7+hkxrGWkd",
  "e6j0W7SZBHJ6+TTb+wWYjr",
  "e7uTB/hGZMt7vnQe6Wcb/J",
  "e7xi6BRfBO1rTP7Nhh3l/s",
  "eahSxAVM9KcLmptshnVk6s",
  "eaqu6sP4VL4bNuW5KhVCF6",
  "f0JzFCbnZAULFDzr5mNCjb",
  "f0VXg5LcVAR4qqj2KBLdKE",
  "f1UbJM2kpHw5Vly1r9+/OF",
  "f1ZFVvlgNOipOz9bV9A6bL",
  "f1/Kx+MSxHTLKOglD1bLT/",
  "f2zmZdf0tBXLlzWVISuCCu",
  "f22NUcfglPoIb9aqNszktz",
  "f3dCiTeWBN4qsIWpKKJaiQ",
  "f5vVk4hJxLW5mv2x0fO5V2",
  "f61D1xgc9OsJbnkPaMrJ3U",
  "f7aR4MTYhElJ83lIM1+L0T",
  "f8UY4sDUlDVIUojezjBZPS",
  "fb0VpRV1RCko1Q1trvR0qV",
  "fcA72RnnxEpptBoWMp7ChZ",
  "fcJ/EDwItHnanMqu2pj91y",
  "fcWgoZ5OVHqpoJUyQwu0Aj",
  "fc/otjzvZAbr9Qt0q6l91R",
  "fdMZfeRqZCmq73xtPD7qp+",
  "fdkpXZtLlD9bIy10687icb",
  "fdqPM7QhBEHLItAgHCG99c",
  "ffnPRiGAZCQbYYYpi+fITm",
  "ff+0LYFHVGBYhSkifZN9HY",
  "00qDfyKG1JkawqZhYNWTzJ",
  "00zRVpb6JKUr5s3sW94CoI",
  "00+qE4zIRCTp6jLtr26c+H",
  "02SbgQ99ZH+q/aSpsAdTd0",
  "02delMVqdBD70a/HSD99FK",
  "02e58u0ftGNb8DQmaHqkF5",
  "04UugpxchFvrvGTZcA71N7",
  "04oDxphxxIyKifXsAId6F/",
  "050WegsWVIYLfO4pTsbuZD",
  "06wX27FXFNV5BQjDamSeDf",
  "062cQf97xEzJ6lgOLCRMe9",
  "064pFRe+BID4xDBIzhTfau",
  "07IF+nRsVBPYnf50u8nSRm",
  "07lYJ8jfZDjaIX0BWOr0aJ",
  "077HRNnyRNxb17fl94e43B",
  "077wayLbtGia6Ts4UlVZkB",
  "08asf3X9NONY9A4mXaXkl8",
  "0aWJB+dONNG4Xm4FZHdw4v",
  "0bUJc1mQFAuay81iv2/tg7",
  "0bU2pE81dIMrXhEzkTgSXc",
  "0bc4FZxhpJM5tIqsFDsDjz",
  "0bqE2c8RxND4FNZ0yJ6E92",
  "0bwFpQEVhGUq2/h6mW5gZW",
  "0cEdgKvXVKu6dHI46uSdHI",
  "0dptssh8xAj6S4mPYxevqe",
  "0d5LOhQlBA77WfYzV6ubjD",
  "0d7JGmnBdOtYQM/ve27ml2",
  "0e0yvcWVpHmKnZmKymQ8Gl",
  "0e68y2MCRPk7+ioSDWBQzx",
  "0fdDeeEPdCcrP2nZLFK/z6",
  "0fqimdgwlFEpJ5CIbad96l",
  "10KzcVCFxJSY3AADmVAcwd",
  "10W1cy1wdLSJraMxqupyep",
  "10g1HahY9EMoR8jajpoFZZ",
  "1063QW+L1B/7egg4acz3Gm",
  "11PpNbPZlCVpZINR4FnjEa",
  "11dcZDrb1DibSDUZ+xWCF5",
  "12I5ffEVZKxrG1l9XFy7xv",
  "12ppurMY9N/67I7ri61y5e",
  "13CHEa5HtEAbdfLuP1AgrY",
  "13PqXETQNFEqslUn5MeuQx",
  "13mHlIjQhB96oCxUL4fklC",
  "135M5jXFtP6I7n3++Y6hPh",
  "14NV8H1TNPOJMoHOcR3AGG",
  "14afLVZuhFn6SJTjKfCaX2",
  "14hOt+dqBLGqph6ApACU83",
  "142iBBFwFNSp2AukUaQlsR",
  "15jgep+JdFsqIL18cN9XYW",
  "16H/bnqDND97Y6NmPQ/f8q",
  "16e/XgWTlG+LRfs7sC0WzL",
  "17s5YLHFhJJpzaBNnarz3X",
  "18g3doVMRET5CzzfonpKui",
  "19Q9g3r71Fpq4TGIr3c1n2",
  "19fs7wCfFCCa8Ec+PgGi1d",
  "19zcUhYJRMuoVvbmrt310J",
  "1aG7ssIr9BDKTXv7N1R4vj",
  "1aHwpMQw9GlY9A7JLbGt/j",
  "1aH0H/qFhJXJ/XxIaqrzhV",
  "1awWwRC8FEHY+UF6+uxck1",
  "1a4oGIt1NOcYdCv2Oev/4M",
  "1bKBhn2SlC3oNRhRBWc9PA",
  "1bo9ZqXhJDop6YvlvOjw0y",
  "1cXJH0D6NP1J+m8vO2jyKz",
  "1cXNyDkHRHPY75av2T+r8L",
  "1c1usqLCFD6JGxoxDlESHH",
  "1dB4oQd1pHVrNyqxxZLs8i",
  "1dZA14AOhC7L27NIOP7RSB",
  "1dd7tYKD1CYZVyV9yCugxL",
  "1d8fmKNXtIRr97hpLGZ3wF",
  "1egbwmp8tMRL9ApvI5qy/s",
  "1elU6Bew9K6ZukeYRQeckE",
  "1fEPfQFmRH/ZX7KdeOgSGb",
  "1fTJyVV5JP+ovEx4eaPCwl",
  "1fic2K4PpMupJ9ln6iy/+a",
  "1f4ulw0/lAtoE7Q8Yn0Elg",
  "1f5l+m1xREkpbU7oO5HAdL",
  "20F+dC45FIbrvAdHAl0BmP",
  "201tutLaxICYssn6E8wvtt",
  "22edqvTnZEmKLtV51J15AI",
  "228njkKlpDJLabPC4/c7H7",
  "23so478LtDO4eLhxET5TNc",
  "23xNcOlFdACb+iNcR19LeP",
  "24DbePl2xNL7cMb0B2xla1",
  "24MhCLmJhOsJUv7jXegpR6",
  "24en8MZHRBXKuX+zdUsReA",
  "24g3qBUdZLy6MXZ3xgnD7a",
  "2496Zs7z1GxKBlO1/VxYVz",
  "25Y3tJ5rRMDIrHSUXcBDmM",
  "25ku4IFX1I9qyYgHY7V/cu",
  "26eUCoZMhAO6DFfwHF38La",
  "26lAJppmlM8ZQ+8ZwQxWW+",
  "27Lz28iwpImYhuqC12PNDY",
  "27ocjjz9RCUKoUDz2tGENY",
  "28Bu7X2TBMm4cns0fGWk/1",
  "29pdtFhdVIfqcoihLI6YQs",
  "2aJBI5Pc1OqaCC8OaF1S1X",
  "2aj37IYqVBQZ7XGfcumtiw",
  "2alpCCGn9Orr4t2xVPGAWa",
  "2attKJeKhDG6OR7yEWXIJ1",
  "2ayLIs6XxOl4jthbRj+iMz",
  "2bAoTkvSpFbbXkFZ8chuXt",
  "2bjeg72aNM1qOzPs0ol9oc",
  "2buQwl7IJPqIuVe/qoByqs",
  "2b+eUsgjxCQYILCcsoTkQZ",
  "2cR0scUOhF1Jg2rJVklYuF",
  "2cvuJdKwpFIKDv+vue42vg",
  "2dy6kmQH5OfIiPfmyYS3n8",
  "2ewacW49JLTYvPaZ6xTCD2",
  "2e3KTd525HgqClBrNsPqiu",
  "2fAksLLxRLF63AVSNZb7OT",
  "2fqKUjl1NNd7sKK+Rktmhk",
  "30FJ2T1UxEdp6BIlvj8DvH",
  "30VpdSt3pCn6V47b3rdr4O",
  "30tXPZeHlOD4WZPTsoa/+X",
  "3041uCYj1Nd6pobPY48Jys",
  "32lgsUZHFOVJjkYUGjblFE",
  "336SJcFUdMEKBohotzm00N",
  "34UwFwLDdFl47hvAi2AYz/",
  "341BTE5+pElIrFUu1TRhYg",
  "35QUuK4BNExKPvIxaYqdJx",
  "35iDVe3/xA0IbTe0jJnzGe",
  "35mQ6lar9MF4hM410nQpQV",
  "36Zx6LUa1MSJ1PkIHbjEbT",
  "37pgAtNlNDpJ2DEKxCzYsN",
  "386zJ7BelDwJNdxzvDpDIC",
  "39sdtYtt9KHrx8HsPpkJOG",
  "3928qbnAZJbpI/tV3gcRd1",
  "396jsy/U1OTrPrmTOuFzbV",
  "3aLnQSoDFMqLEClKsTBBcc",
  "3aZW7OmGdNhoLYfBqMnGXq",
  "3amIlgdjRG+7AvNolOWGLN",
  "3baRcQwXJJoK9cEpgpM4sl",
  "3cE16s8ARNCL7pkGXJ+ZeZ",
  "3cesTyRT1JIYS97WMoLpUk",
  "3cnotQsMxJgYbZbABwUeGk",
  "3cv/+R7HlO0Lgth6bTlm6g",
  "3dM3mlybFDLZYMKLGyzvlk",
  "3dnXuoHu1KPpfStYJqe1M1",
  "3ehVgA+dJOGp+JclZWtqyv",
  "3ey3+9IJRE9qmUJikWPXpX",
  "3e8+kwFbRFWJxIveEZevO4",
  "40REE3gBBDZ6hIGUfC9xWc",
  "40qpmYvr5IMLMKiWZ0WThm",
  "41QqGXJfBMqrjBjTAp6F5V",
  "41ZWgEe/lEUITDJpoHjmN4",
  "426WzoEC5EpKiXa5FIIlBf",
  "43PrEJfY1L7IeclrmolvBG",
  "43YlV44RxOl5G9QuCVK/iB",
  "44P1bFwNJA9KTgtK5q5Hk4",
  "44iIAm8d9DEp+7DXxafvjn",
  "44lPpfEdBK1ZaBYXqzFm8Y",
  "45OGgdV7dJUZslVmKlWQTU",
  "45kr8nGFxC4LrLUBystzd6",
  "452pARCUpEuIEun9t4MfIs",
  "46bvAxHj9DPZ6HjbcZ/46J",
  "46dxxsUhhNQ5gOMqO+4h81",
  "46nWR3hwJFx6o/7w8/J5W8",
  "46oqT8IxFFFo+q3F6lsBIr",
  "46zN46/+BDYK15z4oAg64U",
  "463g7EKedGwpgUJEBqGNwS",
  "47E4QUlIBHN6QJpczjk6Ai",
  "47wikhIotPCqmmsGRp+jUn",
  "48PZf39x9GWp3S45DkISiL",
  "48SvQyF55DXZxa5+mckwbP",
  "48lKoMuHlLZKfzIjowe8K5",
  "496zGM7rVLVZti/CHk39J1",
  "4aQl1F/UVJYpxFNsbUI2Tr",
  "4aZNOE9PpAHZAbqQw9kLk9",
  "4bZn4vMGVKA62AYroabITd",
  "4cMSCy+HlLbLjZ6h91zfko",
  "4cTP3PHH9NdbB7Kd03Km3O",
  "4dQzfDxNFPDYNp2zv3w8TU",
  "4dTd1wmHdGRLE3Yx7+lAM2",
  "4deK3gcD1JgomDvjSYqFlk",
  "4drIDsjZxG4piE/Bom5DFg",
  "4ea4zSboxAXq27X2RhmFbM",
  "4eb52MUaxAo6/hWYXOmqYV",
  "4fTSC3MeBLSKQztSpgUXRE",
  "4f+x0E4WdFjqPK4MehnuwZ",
  "50zBcQoFZFzodh6wFXN5mN",
  "51nlHR1dVFh6JX6seAMTFH",
  "54cGoq2p5DraA34O5zgorV",
  "54vuw01FFDxIcOubmAmrwN",
  "54xrLw93dGua6aZWPHU7HC",
  "55IrH6Kh9MAphdanu8Carm",
  "55KO04DGVDH6GO1BIpgwdK",
  "55q4bCmeFHTI9q1k92yau5",
  "56+D+WoyBFn5Xe9S8Ns1id",
  "58Y+LHGAxLeZPPq1SG0dkg",
  "58sxFiajNKjJkDwu4cAKsw",
  "582B08ktZBm5ZwYOyTcrnQ",
  "59T3n/6C1MS40tFDrdicD0",
  "5aGJmpfatOQ7jvX1YuBBp2",
  "5aMmDkJaxMSa5zApAWhbIm",
  "5aXIBM5nNH86jDkThRYBrR",
  "5ae0jRdRxI7Y5pnT9yiD15",
  "5afZED8pNHXaH0fP/l6QFL",
  "5afgu+sUpJK4pNeT5hbv4n",
  "5auZJkF/xN9qXxrAp90Gge",
  "5b+10RMjFCJoJbxIlOi6Ky",
  "5cKzu96qxMaKJXcaSchHJ/",
  "5dPRCiYNNCm5pqWMz92ukI",
  "5dP5SuH9ZFXqg96Hp+hO2R",
  "5dhYfe9TlFc4JNLqtoyqa0",
  "5d7JNvOvhCNaw2sCDErAEE",
  "5eEvlTkgtAHrRkNk5/WAy4",
  "5er/sTBapJS5FNtWIayL5w",
  "5ewqhknhRL+K8yaObmefX7",
  "5e37Npmc5MBbF+igKNmVV5",
  "5fYenRB29OiK0wwtdDMaX0",
  "60H2DwEWJDz4KV6S3nQlbY",
  "60W6tDQGhGgb09VkQyO3So",
  "61KvKiKehItLVH1dzI1ZyN",
  "61f4AkNZtPjZC4JNcBdF4O",
  "61uR7ocoFDjoDThGbLc6Sy",
  "62Dp/CIyZHUIvbs++mBldk",
  "62UtG0PAtM/Z4xfkS+RuaX",
  "62XifsjhJA/LExfvVa7WET",
  "62ZhdcPH9CZJMK1g78WE8R",
  "63Qu+0q6lAlKzq9j1LfEC9",
  "63mqQmkMdCnoNfNjgGZfhT",
  "64DpiW7kdFnZxpOBHXWO+u",
  "64IXMFNWhDTay87FvWuOpH",
  "6554EGm7hI66Jyp3SyOtAY",
  "66RFR8KIlBu5SDyKbyKxtX",
  "68PzKkexZNNIuJYaOQ8D8K",
  "68y5Cpbq9B2oBBb6zFEWEU",
  "68/ytNC5dNI50PrI+zlUUM",
  "69rbCvwOZOWIuGF/MltR6J",
  "6aA+CemTZPYZqQnbswSMex",
  "6ab4F+OeFIjqG2Pu55vupr",
  "6agsFtd8pGR7emXnL3NFdb",
  "6a3H3AUy1H4rs4zNMvwE2b",
  "6bbIvvgs9Cf5j0g428cDIE",
  "6biz1RlzxBqrjzvACJ0QNx",
  "6b59xGM7ZBDIgaenjBgmNj",
  "6b/4qWw9RAbYtSdZXHz7fr",
  "6cAFSHPGxOEo+OBQUAbIbg",
  "6csuLTuEpHpYQgRl23iO2b",
  "6cz6ensz5Lq6hbppqiZCGM",
  "6dDarU/2RNBZXZftzrWoiB",
  "6dc+QAhbJPDaMUYSrg3dg4",
  "6d4YeNrPZDMpntYS2u5kvO",
  "6el1fWPzFBDZFClPx8oPU5",
  "6fGRus3+xNKJUYtupiwweN",
  "6fcYEcbb5Lmp+6g3H51X9h",
  "70LPAi/vdJXLlqE476x18j",
  "70cjtV13VDmbUXjvy9u+M7",
  "70g705kNRCbq8eUWcsx+SJ",
  "70g8iQDUFLPpaWA2GX3of7",
  "70+ubnUkNM5LDmB7AHAhz3",
  "71VQ+f5DRD8bOM6sgVyvnv",
  "71n/6OhlxL1Z+C40hHrQOB",
  "71sm6xxglAf5BO5v7wPIAa",
  "72dIOQaOlJuYFLuQ3rSvdI",
  "72qm5ODGNG+a332m/L4KQS",
  "726LH3fvRAG4wKB/OskKF3",
  "73eKfz1vNByosiQTsPcMnQ",
  "73fBZpUntJg4pNk5Ej8iQz",
  "73qzwVM35A1LzERSWLU/CA",
  "73ufY6DeBCub4yTkgZGZ7u",
  "74EnIsbrVAAoL2y/yK8g2E",
  "74E5Q9+qtBDJhrYaRBVecD",
  "74GwI1q5JJzKApJmSiTrew",
  "74Nz4oKzZK+aQxVbUZpIoG",
  "74QKBftS9Kzb8NrhFUez3x",
  "74WC8N29NGupDikvokgD7q",
  "74+kewi11Hb6mVi76QcJr6",
  "75X6csCVpCpKxpj608Aodm",
  "75hbFtceNIf6yFl9Tqar4p",
  "75/0wCK0RFHLImDG1pWeD2",
  "76yX1p0nRB5IljeQuOmvBa",
  "77oOkpx/NOS4Jq5a3u+QNe",
  "77qj4KefxJoJRW9Mdkyum2",
  "7764KB4yVJ4qMMqyVb3Rpe",
  "78g7psRwxN6KyORQcTOCZH",
  "79jgwXcFxHLIhIDaDRYytK",
  "7aJMhEV1RIqZHOTvgOpsii",
  "7aUAWAGxBP6qzmwLz1xoSC",
  "7af+FIT+dDy5FDKJK36LMC",
  "7akXYV9UJGBpbLhDf7gIW4",
  "7a/cS3GoJIho+OEHsbEajl",
  "7deVW62FJCrp5APNNNCd3h",
  "7dqE4aDXhLGKM/kQRp8ywl",
  "7dxjFgpA1CXKdWixcl0Os0",
  "7dzYUk735CKbXUF0Aum0AK",
  "7eymce0A9PgYdNwv0zsH2Z",
  "7e8AGzeG5HVYQl7OCOBHMS",
  "7f2KbgCUJPkqxcAqKTdRu3",
  "81UPXMgyRFv69jOKfTa0vI",
  "81d+TASwVCv7gW87qbl4gS",
  "81hns0lblNHKbbBOuhi2pT",
  "81lN3B1DJAzY3HZxSA7Siv",
  "82fPLPtrpEa5ZXEPYihnDZ",
  "82rq2piyRD9btJjDXuSKMT",
  "827bfwnWBEHIkCwfS9O1qs",
  "83dDh3cKNPOrJN25dkwrRV",
  "83jGJnX21O2Za3fsqYdRmZ",
  "83uddwEndIa4b9/b9DmXzx",
  "838UknRRhNrovXuFZ5G/FR",
  "84dAtMJxJGMb6bzEzvKhjf",
  "841Pvlq7lKvqQSXL5wez/d",
  "85AaFre/5BMaaXu4zCseuw",
  "85qbFaA+pMk6+KTz3jM0lb",
  "86m/fzEXdCUrzqIdxHAo6q",
  "862qk2a0tH9JeIdVuJuPTS",
  "87aGf/XqpJ5pvneR95sWld",
  "87mDuhcxtJTYlc9ZBrQCLs",
  "88GoAY2SBAQaZTSaS4DSC3",
  "88KtX97gNPJZvBBFxBfqFT",
  "88W22lmStFnak5giyAge4/",
  "88mOLxMm1OpaRqMLxHZ4b6",
  "88mUIGYFxO97fn0/BDdxAr",
  "88mcdSrs9NtrS+uc3rcxJr",
  "891q2n4GpDiqaAknmkvEa8",
  "8ag+onUoRDrJCgDWp0T3fQ",
  "8ah/oXqG9JDaxiKf7QwDsA",
  "8cSLJ1vJhLZr91NV9iNdZE",
  "8cclMHJvxECI7ygv3tgfvK",
  "8cgUIVRg5B4LeS2PfaMJO4",
  "8c+cnBg4pNirMoRAcBLXll",
  "8d9zKAULBGkbGrwK9pPLqF",
  "8eFybbOltFX69X5YU55wsz",
  "8eqDo9eTJCYatqm1Ifu8fc",
  "8e2PSIIbBGcpRLIuWpWEfx",
  "8fI+jXaXZHDIrDbDBUyRDG",
  "8fKrVhkFhOpbXMhZclXkvP",
  "8fY32fnpJM27rewAFq8S4c",
  "8fhmGq5nZHHa5QxLIfoLrT",
  "90rMSpjfxLk4hUhHljs4/w",
  "91BeTIjUdATp2CIN/doPtk",
  "91mj/UITFLn7yUDhgEkN7e",
  "910Sqj4YpNSKoS1SBUP9E8",
  "92SL5HnyRHbowDP8shC9ba",
  "92s+pFNDlPG4VC84H0D/cE",
  "923Wq/98RPrLj6uBdb2stt",
  "93R5qUY65NeootcftluIBy",
  "93Tcofn/dHBLTbEpJRCxVS",
  "93beJhJy1P16xw/ua0bO1b",
  "94maZbhJlMlb3MPlEr3X44",
  "95MzTEFV5IXqFyvFfbLLHU",
  "96Eg5dUohHqLxIYAjcOJQr",
  "96+b4VOAlO27Ggo0B6pysf",
  "96+kRG59xOeZChavhRitlp",
  "97MtRfvfhOeYjw6e520Asc",
  "97m1dEdrxJwpqDUfdjuTrm",
  "97vK8+N9NJIY+3kQKtWrZM",
  "971wVwu3VNorVk2HyAjdLj",
  "98AARzpDRBHKTkm8taEGU8",
  "98hfDSR+ZAkYfpFVQCQ3sm",
  "984GoJFvBAqI8o7+kw1aWo",
  "99KwTO6j5HAqtO7mJlQ2zY",
  "99hZM0jXVE6b2rccox0GRW",
  "99wFCT4cBCgb2VwabOtPdv",
  "9aC9zH6xlA4aypF1w5xdGP",
  "9aI4foOy1MoKhbUUol+KFg",
  "9at6m+KvtP9LzBR7NB/7Nn",
  "9a9/p93HdFPK2ifRMJ/QKo",
  "9blkBdrZZAt4SixxKN+TRW",
  "9buzcGXNVNNY7/RtN8d6PM",
  "9bwXQMAEhGxK2MF/M/VFd1",
  "9cGg7NeflI5Zh9CKM834/j",
  "9cX6Xc1bBGcJc4Y2BRJiUc",
  "9cbzGacA5KPIgVzj9UW4J2",
  "9d/jfe7RJMvZBOcqPHaOnA",
  "9eBJ3WkQ9GqKGraz3BCIc9",
  "9eRGRZYppDnaWCbdnFzUvQ",
  "9fOpLYJwNIaKTr2FM5pra5",
  "9ffqqfRllCT40etW7Hd4/2",
  "9fgvUf3MpBSKdR+MLJkjYd",
  "9fvY5bb+NBnLlbV9gxb/h7",
  "9f2KP/99FBfJukgRAYz8TB",
  "a0pietun5KToK7McqtrRX9",
  "a1HHZiojxLV4P++zbOplV0",
  "a1RcV1UtFNfKypDrYxdrej",
  "a1SDIBCZ5FKKGHrIUhmVru",
  "a1xO5QjThMeofA9OQVCyFR",
  "a2MjXRFdtLlYQ5ouAFv/+R",
  "a2MkIRhblIqqb2NayUwfbY",
  "a2uAFRCNFHAKAID5VyiQBq",
  "a20C2SGAJOdpoQQxlpCRUX",
  "a207LhgGdI665DbKO4tn11",
  "a23I1WqjlIOpYd4Jh4eJTX",
  "a24ZAQaZJNPI8/O2kVcazv",
  "a259a6OVBEebS4YL/ZA13u",
  "a2/bZYkqRL2aJ1UF7drgaS",
  "a3F9CFYcFPuZYu/iQXpUa6",
  "a3PtGw7QxLw4HNwDP2pfdy",
  "a3TGBmkbpE1awLUtA1YNVI",
  "a3w66nIgxK2bo5j+MSGPoz",
  "a4kHw60QNKmJaKRSyRwOJi",
  "a4tttnfRRDJ7x7UuogLPK8",
  "a4vQZW/eRAFooHpwDfk/E9",
  "a5aY0JJGxM4oW6mpCLnXYH",
  "a5dNI4SptItLiX55eyCeLL",
  "a5q6vscPdNho29oRvFnMpJ",
  "a59qERDohKB5CC0W0nUDcb",
  "a6ZM3zXftCCpcIrlnr8/XB",
  "a6dFDiaOREvotOhbNeoTAM",
  "a7XgnLwR1CvotDvL2k7gRa",
  "a7yEe+mfVFzbe3/N4DONNf",
  "a74bBx65FE/4c+X0tBDTOh",
  "a76DpFJKRBt7OxAu66FFz/",
  "a8OnRZcsNCE4bdoXy/qsag",
  "a8Uso0O95NL6hjAeFfohHV",
  "a89k33y9xA2I5Au2/jl4IV",
  "a8/O6SehVO6IQTbEh3mJGT",
  "a9Vgv25itGa5QQJw1fQpus",
  "a9VxDFtDtP5ZvOHJ/zu3kN",
  "a924zkbTtIs4PWiNSaQxBx",
  "aa+BGm3TVHA6fGhQBtF8HU",
  "abDY4Ph+1Kk5nrwkkyH3hO",
  "abFRKa881COJLmkMs2MCyY",
  "ab0WfyPQNGm7+HhU/BRkJY",
  "ab4JGRdINFP4N+B6vaoxE8",
  "acDzW72bdKT79oXmrgR1va",
  "acq47M4LlBYIhe2KkncPWm",
  "adI1XsACZJi46ZKax7Rhg3",
  "adTRHSAtxPAK2VbQG1pbgH",
  "adZNPUinZNrJ5yeNqSJYwW",
  "adxCGdS5JG4JpDGNAGuXOU",
  "aeld4tUQ9MoZX4sqIK/E96",
  "aeudb9LtVCnpV8bYmsYggh",
  "afUxQuiTJHu5JiqOcHD515",
  "afXeYSR+hBKpunntDQYSn2",
  "afrHtqID5GMIbv8iuH1+eJ",
  "b0QgQT/XlCYKMnY/Gx0f30",
  "b0Qr7i2LVEiINPqMDZJUbh",
  "b08vQ3MTlHYILmhSRebhRt",
  "b1R2JgcmVKco9XqQcgnm5d",
  "b1aSaaU7BDgJZAJDbM+Ty8",
  "b13+CB/1xEQpVwhrZbIfNr",
  "b2SqnBJntI467CQzS9g/+Q",
  "b2e01aZgtO+ozuv7XVR0vg",
  "b3seXLpt1CAZDd24nfHb5z",
  "b31HJs7X5ARo0SZXWS1TE7",
  "b4G9UOOadFObPl0sfnhccJ",
  "b4M1MMJlVPz5V/wD7ruNU7",
  "b4QhA5IbxF9pzQbYtsXpCn",
  "b4mOhqlnNGfbuq1bFm1AO3",
  "b47dE5LyxH9q0RefJTPoqr",
  "b5SbY5sCxEJYBo8Mf8k0zg",
  "b5+tFpRDdIrIT3vNGoS7az",
  "b6ElIMdThIfJx39zBnZ1F2",
  "b8DCzU/E9Lea3GjOBS1V53",
  "b9NpJo9/hN1I7dGZH/zgkU",
  "b9a1Q1rBNHO6gpgsqTjnfv",
  "bagDp4+WZOqr1BDQcWexf0",
  "bajVb3TzxNBa6GARsgwl6e",
  "ba6zHC4P9GKZEALm5vi4+Y",
  "bbPpdsGrlHorYG0W5Op48Z",
  "bbeTsPxOBPdbaifFY8EmuV",
  "bbp6hbIqNLtLmG29RJMNZ5",
  "bcHKfeempEM4oxd/LWa3kr",
  "bcafHJYYBFIbIvgkOujdE2",
  "bcvdV8vhpF64ayvG33BBW3",
  "bdJTvewiNEdbCktmwIcG98",
  "bdcydwa+JOI6pI+O3XC1vv",
  "bdr9WeK3ZFkIBVJZORvGpn",
  "bdsz1obrNHvasUMePPzfuR",
  "bd1/tBFK1KTb0Ymi3wifcC",
  "bd92iHdwdBN4PCs13qIIWy",
  "beHSZq8CBOd4iKxrGX2Y40",
  "beLamDFVNIaYswtwjdvgsN",
  "beW4Y6Hb5DF4tOqRP/WVq+",
  "bedgJd8RdJKr+4DaAhH4Ob",
  "begneP1ERFi4sYZWqsQ2CT",
  "bfAMxaKlZOKr7e64pqLwjK",
  "bfbJi6cIBC7rk/cV5QTrpb",
  "c0AhTERFtHALfd95NBAPNM",
  "c0VwwkvIBG/aQ7btpzmqv2",
  "c0cOCc4ShI+4N027BzfO5B",
  "c0f9Yg43VASJknacRbSG0M",
  "c0nxuuKgVE9oudKkuxsYmQ",
  "c1Gn9VnLxAM6h1Xc4TVWAC",
  "c2btJkQvlONKAknfs32/Hh",
  "c2pEP9XE1K1ZMKq0Q+w+fW",
  "c2rVMXnbFKSr9tDFbOLdMJ",
  "c3DzcW+KpBnrTCBQcfPnnK",
  "c3E0KGtU9FjbHAx37Bljvl",
  "c3NNK7y2hNq4nDmSopihWl",
  "c3t0AMvgxElYQECOTfg/q+",
  "c3yaTGtyFP2JR3ezXciwL3",
  "c4RSufbytAJpt5nQ+Y6wQ3",
  "c4iWSz11xGvpGC8n2m/IpN",
  "c4tS22atFDN5Bgvnyb8ZL6",
  "c44gWj3+lBZ534kBqA1K5K",
  "c45MJMGN1JjIePZFFVMr8t",
  "c4+a6UNChEHKtDfjxDQYHh",
  "c5P5fqHcFI7qmX0HkLuIan",
  "c6Zihm05pG74u5y3XpcFRi",
  "c6bkOdybhJ94TcqFGi+Q7q",
  "c6tz2b4blGj5fqz7oWY93k",
  "c6+GLM5r1LMaHL/KhuX6L8",
  "c77kqP32BJnJpftVtZOslk",
  "c8SIXwgZFHFbGkGPag93Kh",
  "c8fbm8SbdDwJQQC40CXON8",
  "c9xQrNwLZGDbUfh0goW2wF",
  "caOiN/Y3VNWa4ulD0toE2W",
  "caVMbfcWFFk4yY1HJfDj/H",
  "car/Jd2rpILLpY7gffIf7/",
  "caxoMkNRxEbrJ+iZUnVwT+",
  "cbfu53kzlMXpOmra6BR2Wg",
  "cbkaJEmu1DQqRbTs7k14hK",
  "ccTNaNeeJLcaEOtXdr0JCp",
  "ccfCdSMPRD57dK4bF14W+a",
  "ccyJ5qcj5JJ5qeMDA+Vf0g",
  "cdq1R3eYBAarHxycsNzlio",
  "cdt8IJSKdHFL9hgVicaRT2",
  "cdyoGx0bhO1oWhRFaKIeLe",
  "ceaXgLq8pEUoSKH4IOmXwX",
  "cef25PYJZOKrUXBkjs3UdG",
  "cenBCGO21G56oH22PxZa10",
  "cfK06jJHpNNodcXidqUTnV",
  "cfWJ0LpKlDeaV77xYpVUyp",
  "cfgMOHfcZBWLazAfs7Veon",
  "d2ExBgEMlPiZjt+NQGLscG",
  "d2dXrPJkFKC6V1plcFWGAf",
  "d4i+JSyqxLELxd03Prn+OF",
  "d4oZ0bI+ZBg61a2V5lDE8W",
  "d5CSNxthtMf4pMW1Ly7+wt",
  "d5RoRcklBCoJKIXGzYXPr7",
  "d5+8qEAARLRJ8k2E/cWBIM",
  "d6B5UrqnJNoYREDabgtY42",
  "d6sztlMEtNXr/F5T/LxH+i",
  "d7UroO9lJBTLOwvSSUH3lH",
  "d7zQYqlatOT5pIfk14FJLW",
  "d79QRWiuZBXqaFjR97QApL",
  "d8CJb6H5hBdoCJxDgCRJ8R",
  "d8VhBrsgNNg4cQGIeT2Tg6",
  "d8wMUb/Z9Ns4RP1qOSpZrX",
  "d9Zld6/cNPcJijPUZ+OE/Z",
  "d9fyyHlbxDCL4KMcEhxFfJ",
  "d9j66Ruq1GGIETsdwLXTrA",
  "d92IOMbGFIg7MXXfwNWsQS",
  "daEiNdMtpLM6UOVraXsX4q",
  "dats8TyzFCWL2eBgQ6nIwY",
  "dbAzm83R1PLJFPCfc1gJPt",
  "dbFjk9zh9EV659gfBnAlU4",
  "dchglTOWRCs4B5mVUaNGZR",
  "dcmAWDCh9DmrKHSCu00O5k",
  "dcyHH3bHdF062zWF3CzIhq",
  "dc062qbRpCf6YS4PYbZ/So",
  "dd+O/kFdZHuoWgfdKZAPg1",
  "dd/q2Lr1FBJaJh7dletfSd",
  "dePmCka4FNWKYbTDzPSVXx",
  "dehG0iSa1Es6aa9pqlLncC",
  "dfZcYU2oVI8bYx58wUNx7/",
  "dfm700RtBPT59Ofe87ww4b",
  "e0HOzQOhZBx5RxCOuoLBTv",
  "e0/Nf/GdZDDapKrUfKTEvr",
  "e2PGTwJEBFGokOqLWnM6Q1",
  "e2Q0hLuVJEL7VKHEKUcjZV",
  "e2ay8Glk5Bf7hxjFH2NZmW",
  "e28V0nn2VGP7xL31YVdFn7",
  "e292QmmhRDHKT9Fw0YCBkS",
  "e4IHykPGhKpK/AP+WBR9TT",
  "e4javsSQlH76t17uIHe7Jb",
  "e4yrI6UNNEt72WMgbaQTkJ",
  "e5PlOLpDRCV6DLcKqX0vUA",
  "e6Wbpm38xBhb9Kt7DwB2Gk",
  "e6x2j0XVFJA7aFChDX6470",
  "e6zlGeONBFmK6n9wRh0dcQ",
  "e7PUXLR7pC3b5EOoPU8kJF",
  "e8MI6y9KlLDbxNL+bFRona",
  "e8lQEApexOhpJTcnUGKLfB",
  "eaDGNO9BpGNZzx/ztEqbFl",
  "ebn9JzCrVO5rHkCWeRjM3Y",
  "ecMSnCcn5Lsa+kzRFyon3n",
  "ecOAYUQXJBrLB8eUCSxgr2",
  "ecSCbWAw9H8Ks2iRP2h9Di",
  "ecpdLyjvZBwrvm+cedCcQy",
  "edPEaZm5VL34hVC8GhBkj3",
  "edRNpWP+JNVo34Ea37sqAL",
  "edVdblhA9FlIiPPtj2d3sr",
  "eeF510KrBNHrxi55AgCmYJ",
  "eePBURTZlL3IghNT9J4EXg",
  "eeaX2HZjtJb57nqCchRx/f",
  "efMN75MBhEvo2Vxii2Bfme",
  "ef2ZbgIw5KELrVsOu6gkkL",
  "f0Nhv0uFNAu4wjMG0Puq41",
  "f1p2nG3AJESYp9/nHQmSNu",
  "f1zF4GgwdEubBJbDdA0Ulf",
  "f2DGcgMz1Lebcf1Ld1vdBV",
  "f3Nl/B/ONLK4D6oGRuJwVt",
  "f3bOPgOBNIuJpdjbOU3059",
  "f3wQvRV0JJUJ3/Igf/MnlW",
  "f355g7ZjBGwYbOrx9Krmn5",
  "f4PezHIMdMPZ8CcUYEOSf3",
  "f4S1We/qFC/b2X6GIGZP1W",
  "f4llbLl/tA2r+3mxrZVaLP",
  "f4nFE8gFBO9I/r1uPlZqSA",
  "f4xJbqX8ZAH4UfdS0V5NfI",
  "f45E3PWONBL6cehbhLLe7q",
  "f5MWAQ1yJHUJYIuV9Y6u7A",
  "f5pxe9XN5P7rT/288FSUHk",
  "f5vjl9cA1PupYs94Fx4vxV",
  "f7VQIAC+BIGrjBpVL0AAic",
  "f7bRxPm1hLrKGg2YnLyJWh",
  "f7zeyaYR1N55Ws3CDFJ8+E",
  "f8fumphHFMNIF+VWf0k9aX",
  "f9GCZS0j5CG5vtcR+G5hEN",
  "f9LoJDJ9JCcLTCh7iiv1/C",
  "f9947WXTRGDKAndQrpOtSn",
  "fajYjTmoRHGKYe2wCpVEiA",
  "farGVolFxA96q6rVvKa34G",
  "fa2jmJoRpOeIDKEhDdSbe2",
  "fbYMsCfrNFcrRTF79gsdRK",
  "fcTXXdobtPIbu308KDcx/F",
  "fcfRVhU7BCXrqj7rhwyNoA",
  "fdFiAwrSlCio99OaBFD4KS",
  "fdYnJFVVVGcLAsHxG11vyM",
  "fdcxhAhB5HwJSwMIgEa1CB",
  "fdu3Ad+mpN/52DWc+38FnS",
  "fdzh97YyxCC59qz3EbPwRp",
  "feICVHbp9Pcb3Yxt6K9Nj2",
  "feONqKGBpGMbQE7R/Yk/b3",
  "ffWEACK21Hiahdi2cXctLK",
  "ff0Ga3cahFg7G2IPiiWYmY",
];

// for (let i = 0; i < uuids.length; i++) {
//     console.log(decodeUuid(uuids[i]))
// }

function dePlist() {
  var list = {
    burn_00: {
      __uuid__: "52WUA4unZLxKwQoWU3hcXc",
    },
    burn_01: {
      __uuid__: "64hzOVUYFPbqUwrwXD3GDJ",
    },
    burn_02: {
      __uuid__: "52rorO0edAUqjv0jLHnybL",
    },
    burn_03: {
      __uuid__: "3dMcDfs5BEX4Y4jiqdU12h",
    },
    burn_04: {
      __uuid__: "d6BJc+toVH4biPSj2mSC6q",
    },
    burn_05: {
      __uuid__: "18tsmak/9NsqimHgR0kjam",
    },
    burn_06: {
      __uuid__: "b97u5HpvVHw5DDNp9kQeLe",
    },
    burn_07: {
      __uuid__: "88KEN1p2pDsKh30tksPbQK",
    },
    burn_08: {
      __uuid__: "14pDCZbuVMOIqbv5FcQyA3",
    },
    burn_09: {
      __uuid__: "42cX7zxVtDHYctSGRxcyFq",
    },
    burn_10: {
      __uuid__: "4aME0wUjZP15/RwkvLDZGX",
    },
    burn_11: {
      __uuid__: "deUkN4orNPYaBxOL7rq9oZ",
    },
    burn_12: {
      __uuid__: "17cxrv5ohCHYzCH7DVjDTV",
    },
    burn_13: {
      __uuid__: "7aCv9tx6NLl4lGYYzfkQE7",
    },
    burn_14: {
      __uuid__: "b3NQ5RR3FCGYSb7RzAKVsC",
    },
    burn_15: {
      __uuid__: "dfTrcCRqpK9Z6xuoRb8lFQ",
    },
  };

  var textXml = "";
  let resPath = `C:\\Users\\F\\Desktop\\apkHack\\out\\assets\\res\\import`;

  for (let fileKey in list) {
    let uuid = list[fileKey]["__uuid__"];
    var fileName = decodeUuid(uuid);
    console.log(fileName);
    let dir = fileName.slice(0, 2);
    let p = path.join(resPath, `${dir}\\${fileName}.json`);
    let text = file.readFileSync(p, "utf-8");

    let rect = JSON.parse(text).content.rect;
    let [x, y, width, height] = rect;
    let string = `
    <key>${fileKey}.png</key>
    <dict>
        <key>aliases</key>
        <array/>
        <key>spriteOffset</key>
        <string>{0,0}</string>
        <key>spriteSize</key>
        <string>{${width},${height}}</string>
        <key>spriteSourceSize</key>
        <string>{${width},${height}}</string>
        <key>textureRect</key>
        <string>{{${x},${y}},{${width},${height}}}</string>
        <key>textureRotated</key>
        <false/>
    </dict>`;
    textXml += string;

    // console.log("decode_uuid == ", fileName)
  }
  console.log(textXml);
}

// console.log(decodeUuid("4eVR6B6slIaYUgycjLiGex"));
// console.log(decodeUuid("0bipe0DutIIbap/TAQgOFV"));

// dePlist();
//packs  ->  uuids
// exports = {
//   decodeUuid : decodeUuid
// }

exports.decodeUuid = decodeUuid
