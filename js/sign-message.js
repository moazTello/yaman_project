/*
 * JavaScript client-side example using jsrsasign
 */

// #########################################################
// #             WARNING   WARNING   WARNING               #
// #########################################################
// #                                                       #
// # This file is intended for demonstration purposes      #
// # only.                                                 #
// #                                                       #
// # It is the SOLE responsibility of YOU, the programmer  #
// # to prevent against unauthorized access to any signing #
// # functions.                                            #
// #                                                       #
// # Organizations that do not protect against un-         #
// # authorized signing will be black-listed to prevent    #
// # software piracy.                                      #
// #                                                       #
// # -QZ Industries, LLC                                   #
// #                                                       #
// #########################################################

/**
 * Depends:
 *     - jsrsasign-latest-all-min.js
 *     - qz-tray.js
 *
 * Steps:
 *
 *     1. Include jsrsasign 10.9.0 into your web page
 *        <script src="https://cdnjs.cloudflare.com/ajax/libs/jsrsasign/11.1.0/jsrsasign-all-min.js"></script>
 *
 *     2. Update the privateKey below with contents from private-key.pem
 *
 *     3. Include this script into your web page
 *        <script src="path/to/sign-message.js"></script>
 *
 *     4. Remove or comment out any other references to "setSignaturePromise"
 *
 *     5. IMPORTANT: Before deploying to production, copy "jsrsasign-all-min.js"
 *        to the web server.  Don't trust the CDN above to be available.
 */
var privateKey =
  "-----BEGIN PRIVATE KEY-----\n" +
  "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDB8iwmQjUyKBac\n" +
  "SBAND7OHyJivW6Ozm0s4Fh6i7FisKwC2xOnkH3JIdIy4uTE6HhEgKA8BTeOQBHDB\n" +
  "Jg0YS2i/afxbj/6BfZekfzQXuTXzX5OgPhwhjNWeqplhBZcX454nMCNiwKECW10e\n" +
  "12z1Y5c3ZN2M0lPujYZTgsqccajPBv9+T4wKh0XsVP6jbYff0Y+xYv6oEkJnVnY/\n" +
  "17kLDLYUB6HeVu6bgiA7Wzfim2ANTtG91Mq8X4ZBOCCfmAgljRSWbpD6Da1JlErL\n" +
  "XOP8oiSU1MjqXsLO28SF2hG9EujMU+V7+vzrWGbQfGPVNUc4oxSae2cBd998wxNJ\n" +
  "gYwq95w9AgMBAAECggEAD3PyABdg4S7wBEI6oyvH2G8LeVdiHval4uFiTgVqWEdx\n" +
  "3l4oq6A0zSCaMMKysSiBoVAHyAkSc2BjMoSLYQ7rGOtDK/F4bA1bdoQbHLPJYGuS\n" +
  "Wd9xAtxTjfmWUHRvUjw01vb/Lshd28/3RrSP7iph+0wqWeTNQrHcjM1cQuRMeLg4\n" +
  "cF1urUnsAuznfo+/e2uuCpDlz8UYIe7Xh1of1YPXKkTqyrRUr+PhOs53cXVGS9rg\n" +
  "tabanzHFKD1HDislWZYNwXtdvsyMuz/aaWk5OsLG1qeothyMD49GZo3JVJqAk6Zx\n" +
  "ehmFwrxFOokWTdNQ2H56PFASigL8IaATvCNCxg+yaQKBgQD/GFlhFTqdCFPC0eAr\n" +
  "5HoW6m6AUXCEC0QqxPjhYrnS7XsYkchGjZ5r3Zd/V3V/K/mq8bTu0bb7hkQIvCzk\n" +
  "6R0Y3ZTL2Ae2bO4c8Hg9EyMJLgehebXrlM4AECEMjJ+Vjbdv34EySLSRhAWTMYaE\n" +
  "3ol2hbbUY02lKR2exqHCG5dv2QKBgQDCoktGPg+eyV0M7VmikhAz2OOieXHWhyqT\n" +
  "ouR4o4wnG2qFkS/ujf2JBLZDaZ2vTxFxojdzlmm5BbiMpU4pnD0HYE3jeMKEBEtm\n" +
  "bhYTRZ2SV17juOknbXcdBVvgiSJKAg0aHWnUCR1L0Mslp30QMIjxkec0UzQWViLr\n" +
  "NEYfX561BQKBgQDjRblUEorfH20o9L3pvSy9P+5laql5K2R3SniGrePrNePnFvM9\n" +
  "UK1lYs64CJ7JR8+v6psN71A8tfnlYmoJJFvlLH2GQ5lTgad/pwspNuSPKDBqQDrB\n" +
  "ghkq2zPmr1766oEVLic4OqiNwPcKliRIOtB0BVvHzBWAYapfLI8vlk+MuQKBgGzf\n" +
  "AYI6JtyoQG+BuNjyITQPR03T5vScSRmqTWiZ+0TI1i3+h7RGIqLpStaslnLApL5O\n" +
  "gfwbD+paI+Awe2dVKOIeYZMzMoNML60NOTXwg/KfAsoY3fqbBbzrCXiw3MhPG2sX\n" +
  "NuJPct683VWjuZY7v+54sb6YKBOyfPfaFrtn7kvNAoGBAItrnuUmzofDDC2N/XRs\n" +
  "GXOPDzPfUmjHDGG9QUQNnHn/I7A5zZPSHuM3IwOfPSehcVYUh7uwo94CYp2V1/lT\n" +
  "Tesr39sqMhn0rT1nl7x8FhenSstmIujOmZXJbM6LY4leqbzQrNwbwgnO6hqIjUW+\n" +
  "IbrFm89Megn9e493f+oEPPJL\n" +
  "-----END PRIVATE KEY-----";

qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
qz.security.setSignaturePromise(function (toSign) {
  return function (resolve, reject) {
    try {
      var pk = KEYUTIL.getKey(privateKey);
      var sig = new KJUR.crypto.Signature({ alg: "SHA512withRSA" }); // Use "SHA1withRSA" for QZ Tray 2.0 and older
      sig.init(pk);
      sig.updateString(toSign);
      var hex = sig.sign();
      console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
      resolve(stob64(hextorstr(hex)));
    } catch (err) {
      console.error(err);
      reject(err);
    }
  };
});
