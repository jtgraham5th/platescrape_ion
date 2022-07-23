import { Store } from "pullstate";

const FeedStore = new Store({
  tags: {
    diet: [
      {
        name: "Diabetic",
        image: null,
        id: "407",
      },
      {
        name: "Ketogenic",
        image:
          "https://lh3.googleusercontent.com/QpcVP1W8t5UyUHTmKIKCaJERofhjUNTc7PoU0weBgZnusJVuI1ZWjfwY94fpaqib9PTVYJ0K7CPcn53rgP0V",
        id: "406",
      },
      {
        name: "Lacto vegetarian",
        image:
          "https://lh3.googleusercontent.com/77_9IXJJYS2V8V6VCidrjBZiRKF5cLeTTXc0l2wNNBMQ-FxF9FdTg-lwAslEKqCtlT-IJ58Rb75DVMmEGKfhPA",
        id: "388",
      },
      {
        name: "Low FODMAP",
        image:
          "https://lh3.googleusercontent.com/IbdiMvAULFWYfLsHtFMGCS9Bpc2TnvQ40PnxSAmXqvddJwlrs77ERnTKuFDgWAm16Egk4gPKqT4GUpJEFbs9Ew",
        id: "408",
      },
      {
        name: "Ovo vegetarian",
        image:
          "https://lh3.googleusercontent.com/9N1ZWEXeRAp8SMz2Hpe8OWIxg8heQ3WPxgBGEZD0vY8iIAn1DaILI9jpvfQpS92_J2YgWeGzhW_j9fx-lqYS0A",
        id: "389",
      },
      {
        name: "Paleo",
        image:
          "https://lh3.googleusercontent.com/duQZOgn7mZE8G_Q3vXeEvg9ReFTLgKu8J_-vGbcGGgEu0NmFw01NAYWYPaCmppF9b2WXKpCVMqSLjbMeICkA0w",
        id: "403",
      },
      {
        name: "Pescetarian",
        image:
          "https://lh3.googleusercontent.com/3ywdnUqCFVYMW_WEPE7kjYr872VqxXhQwdGQohuuOikrOOsIEb-jdvlyMbWb3Fzials2WslgS4j8Hoa4143qLA",
        id: "390",
      },
      {
        name: "Vegan",
        image:
          "https://lh3.googleusercontent.com/WA04uhMtn1JMUBuaw3_HvSKcbRAJi8uq-VrsgsXoa3vAWsKUwSwfKovn4sbGX5UEdQtgBKI9PFZwUM0Ke-x76Q",
        id: "386",
      },
      {
        name: "Vegetarian",
        image:
          "https://lh3.googleusercontent.com/14cVX-1X9XE-s5LLPVQL1SNavPnmpluId573FlF02lCg1pRCtoXeUJrJwRRbImQ1XOEAfLYuXo3AsLPvATDK8g",
        id: "387",
      },
    ],
    allergy: [
      {
        name: "Dairy-Free",
        image:
          "https://lh3.googleusercontent.com/h4arkjYMH-WIAzCT9Fqk7ZXfUHitRG_IIcdoDwYvSqYz-8zvq_TKRn1xfl6oexrxJh62O8qe0jesr7rb3vc",
        id: "396",
      },
      {
        name: "Egg-Free",
        image:
          "https://lh3.googleusercontent.com/nWCRPyM0hcA-yzxmtRjZKcl30BlYcA8nEesZxlLVuVewGcKjQIhVt0Yr2Vg6tdz7709IeS4YBjkR-L-mlC-SQqQ",
        id: "397",
      },
      {
        name: "Gluten-Free",
        image:
          "https://lh3.googleusercontent.com/MhOdDwDdS__FOp8PtTMyL0LUWUAcXk04my-kyKS2L7ynl0B9ZomBb-TjsuFD09pwFi7cLP3MSYHN6JQZn7tT4T4",
        id: "393",
      },
      {
        name: "Peanut-Free",
        image:
          "https://lh3.googleusercontent.com/7UOdQXtesCd_YDNbZGBOHBHFY55mJLCRyIyio1hqN0E1uHRMj194jm4FEYuO8t13ZWRfgSsEUoQrtfbDZVcmQw",
        id: "394",
      },
      {
        name: "Seafood-Free",
        image:
          "https://lh3.googleusercontent.com/gbhPJsZPGAilfEJ6-OcVIIRVV4D2djXAI49eSMuboHWMe9VQn5axqCah7NZgsrWiuR3vBP_xs2ts5_rGNaXG",
        id: "398",
      },
      {
        name: "Sesame-Free",
        image:
          "https://lh3.googleusercontent.com/Sb7k55vRM1xRgijigsicplkb5U0_qSnYYWLW9qYvJLjTNgFLdIzebBg0FoS1nC-tQ_JWgmXV6ta2D_OILYuUbQ",
        id: "399",
      },
      {
        name: "Soy-Free",
        image:
          "https://lh3.googleusercontent.com/Sot-Qc6vqMjLwhe0-9B14icAN1m2Z1k9yTLmwjouCR2m4MY5XZcLAPkTqeEAvA3oS5lms3LvqSn3PJXUxTAtlw",
        id: "400",
      },
      {
        name: "Sulfite-Free",
        image:
          "https://lh3.googleusercontent.com/LbZsfE8cw2ZNfqZLNTzc16rJRyhmOU5aQA1OgljCGBacSuwpFK5aoV_nBZ74Tcsx86NQh8xJenXV04KxqFsr",
        id: "401",
      },
      {
        name: "Tree Nut-Free",
        image:
          "https://lh3.googleusercontent.com/9CSucQcZpkgmsfVmue0Iz1HlzVXxesNwP9bA7BblACMnn_ZRBRgi1VcgLJG7vt1rMx4o7bOKB8ds4aOUSCwpig",
        id: "395",
      },
      {
        name: "Wheat-Free",
        image:
          "https://lh3.googleusercontent.com/QYiWHEaOxLXr7Y6Ng7cKSBf8Fk5B77wwyTjwfFIbER9BLWinvRL4pKOx8sDOy9PhI18AcMPK_UCx9NBaCWYXm7k",
        id: "392",
      },
    ],
    course: [
      {
        name: "Appetizers",
        image: null,
        id: "course-Appetizers",
      },
      {
        name: "Beverages",
        image: null,
        id: "course-Beverages",
      },
      {
        name: "Breads",
        image: null,
        id: "course-Breads",
      },
      {
        name: "Breakfast and Brunch",
        image: null,
        id: "course-Breakfast and Brunch",
      },
      {
        name: "Cocktails",
        image: null,
        id: "course-Cocktails",
      },
      {
        name: "Condiments and Sauces",
        image: null,
        id: "course-Condiments and Sauces",
      },
      {
        name: "Desserts",
        image: null,
        id: "course-Desserts",
      },
      {
        name: "Lunch",
        image: null,
        id: "course-Lunch",
      },
      {
        name: "Main Dishes",
        image: null,
        id: "course-Main Dishes",
      },
      {
        name: "Salads",
        image: null,
        id: "course-Salads",
      },
      {
        name: "Side Dishes",
        image: null,
        id: "course-Side Dishes",
      },
      {
        name: "Snacks",
        image: null,
        id: "course-Snacks",
      },
      {
        name: "Soups",
        image: null,
        id: "course-Soups",
      },
    ],
    cuisine: [
      {
        name: "Afghan",
        image: null,
        id: "cuisine-afghan",
      },
      {
        name: "American",
        image:
          "https://lh3.googleusercontent.com/EPlBgVyTTjg0Krsscr_tNhGWjcKU_rYE9030zUVyqfyN9DpGhik6B8ujzoiXI9dWGryL40ub81c49-Axa7503KI",
        id: "cuisine-american",
      },
      {
        name: "Arab",
        image: null,
        id: "cuisine-arab",
      },
      {
        name: "Argentine",
        image: null,
        id: "cuisine-argentine",
      },
      {
        name: "Argentinian",
        image: null,
        id: "cuisine-argentinian",
      },
      {
        name: "Asian",
        image:
          "https://lh3.googleusercontent.com/TecD8eHaS64IjroOeI18nPqqef59MJgCtLufZS0FP_wfoPUXf_xHE8-1rmknNa4SbizIfMfdICiVxllJuFGYTA",
        id: "cuisine-asian",
      },
      {
        name: "Australian",
        image: null,
        id: "cuisine-australian",
      },
      {
        name: "Austrian",
        image: null,
        id: "cuisine-austrian",
      },
      {
        name: "Bangladeshi",
        image: null,
        id: "cuisine-bangladeshi",
      },
      {
        name: "Barbecue",
        image:
          "https://lh3.googleusercontent.com/iEp1dBeVM5KpLiQAcxLrInZCdbfGUbPmCMr4pq99ERKeLJFQHPCZZvMuBN9jpE30jHaaC06ypE1xZUDxapwZaw",
        id: "cuisine-barbecue-bbq",
      },
      {
        name: "Basque",
        image: null,
        id: "cuisine-basque",
      },
      {
        name: "Belgian",
        image: null,
        id: "cuisine-belgian",
      },
      {
        name: "Beninese",
        image: null,
        id: "cuisine-beninese",
      },
      {
        name: "Brazilian",
        image:
          "https://lh3.googleusercontent.com/4eIf7pG11NiQx1VwkYGrzxonwQvrJ1Roi-7YfcAVz7SaaZnPh9lbu-pjQN3tyMa0SRDu0s828SfvQTdujXAfjjBuvfBY2QJHb08",
        id: "cuisine-brazilian",
      },
      {
        name: "Bulgarian",
        image: null,
        id: "cuisine-bulgarian",
      },
      {
        name: "Burmese",
        image: null,
        id: "cuisine-burmese",
      },
      {
        name: "Cajun & Creole",
        image:
          "https://lh3.googleusercontent.com/D-yhXczh4GugM4leqOIXZR7zf1p9S0XFmGMtsJAD34AFlard5BUdBvhNuYkJjcMQEe1Hf5VgcVTChOoBEIvJ8Q",
        id: "cuisine-cajun",
      },
      {
        name: "Cambodian",
        image: null,
        id: "cuisine-cambodian",
      },
      {
        name: "Cameroonian",
        image: null,
        id: "cuisine-cameroonian",
      },
      {
        name: "Canadian",
        image: null,
        id: "cuisine-canadian",
      },
      {
        name: "Cantonese",
        image: null,
        id: "cuisine-cantonese",
      },
      {
        name: "Caribbean",
        image: null,
        id: "cuisine-caribbean",
      },
      {
        name: "Chilean",
        image: null,
        id: "cuisine-chilean",
      },
      {
        name: "Chinese",
        image:
          "https://lh3.googleusercontent.com/4p5XFQm6rq7NlD5_ChF-zjjA3zjFupC6koz3XzywGtqMxA10wKFkjDBoXghF8pIwuZYbrYpB6FwRQAoWQqbFFQ",
        id: "cuisine-chinese",
      },
      {
        name: "Colombian",
        image: null,
        id: "cuisine-colombian",
      },
      {
        name: "Costa rican",
        image: null,
        id: "cuisine-costa rican",
      },
      {
        name: "Cuban",
        image:
          "https://lh3.googleusercontent.com/YWgBSiPGAH5KVNlrh1OtEWGqHaamRcQ5VMO12Vq8ubvpwgppn8qALXwY1U23E4D5oN0LvdpQVS5JkySb4Qos",
        id: "cuisine-cuban",
      },
      {
        name: "Czech",
        image: null,
        id: "cuisine-czech",
      },
      {
        name: "Danish",
        image: null,
        id: "cuisine-danish",
      },
      {
        name: "Dominican",
        image: null,
        id: "cuisine-dominican",
      },
      {
        name: "Dutch",
        image: null,
        id: "cuisine-dutch",
      },
      {
        name: "Egyptian",
        image: null,
        id: "cuisine-egyptian",
      },
      {
        name: "English",
        image:
          "https://lh3.googleusercontent.com/6zBYqYg-Li7VQgoTnR_gw-W7hdcR5RNUiRE_EUfASM6yv6sgdv4OxV4We4czKVJlq9f3B9JMAkz9eBicZjMx",
        id: "cuisine-english",
      },
      {
        name: "Ethiopian",
        image: null,
        id: "cuisine-ethiopian",
      },
      {
        name: "Filipino",
        image: null,
        id: "cuisine-filipino",
      },
      {
        name: "Finnish",
        image: null,
        id: "cuisine-finnish",
      },
      {
        name: "French",
        image:
          "https://lh3.googleusercontent.com/P1yXYpp0fXGJQWY8JVAQMBGJwU8Bh6hvPXI2d7gC2Eppt5cjNGh19O6G8ybBUiDmA49KCBwIp_FpnV_Q2f7ZiQ",
        id: "cuisine-french",
      },
      {
        name: "German",
        image:
          "https://lh3.googleusercontent.com/4SZF0S_n0ZYTUphvWQRN_Z0uEZZ643aCE5fj3C1PuhvSD-H8f5XCEyTc3c7CT-9xEMeaNKb2W5U_rgSRLgzLcA",
        id: "cuisine-german",
      },
      {
        name: "Ghanaian",
        image: null,
        id: "cuisine-ghanaian",
      },
      {
        name: "Greek",
        image:
          "https://lh3.googleusercontent.com/9ROo3YNCCYnwt3Eod1nO_jYElhC3c8XMnhinTXqIXZRU3AOZ3dm9g8PCsgXlbE4CA5TMASDrOTLwpNaSq93vgA",
        id: "cuisine-greek",
      },
      {
        name: "Guatemalan",
        image: null,
        id: "cuisine-guatemalan",
      },
      {
        name: "Haitian",
        image: null,
        id: "cuisine-haitian",
      },
      {
        name: "Halal",
        image: null,
        id: "cuisine-halal",
      },
      {
        name: "Hawaiian",
        image:
          "https://lh3.googleusercontent.com/Am1MrH0I1UfQw9UZawBWiWfqyTyDVoQjeSrZkPHH4gQwR74fc41HQ0eA9LOM_xx-TRhZsBpmlLrep_MEVcVGTQ",
        id: "cuisine-hawaiian",
      },
      {
        name: "Hunan",
        image: null,
        id: "cuisine-hunan",
      },
      {
        name: "Hungarian",
        image:
          "https://lh3.googleusercontent.com/OPIuMUneDnwYwsyrvOAWDPEYRD3qrFrDVsohCJjnT4cBJbLxHG3Z8ItUix0_TWSzlRx3wJNuafR3bBNDwE2LpQ",
        id: "cuisine-hungarian",
      },
      {
        name: "Indian",
        image:
          "https://lh3.googleusercontent.com/bh7KfzjRzTbsu89SXIX4OlU_60M1UZe66do_RHx8g9_qJ5l8_dnHqsWaEKKkgVSYKXK6UkpoaSDzaP-QWMF0Jg",
        id: "cuisine-indian",
      },
      {
        name: "Indonesian",
        image: null,
        id: "cuisine-indonesian",
      },
      {
        name: "Iranian",
        image: null,
        id: "cuisine-iranian",
      },
      {
        name: "Iraqi",
        image: null,
        id: "cuisine-iraqi",
      },
      {
        name: "Irish",
        image:
          "https://lh3.googleusercontent.com/0hbrNpW7_rLFPBR_v5z5PVAWoG5NAZwCqew2cmxabo9pbQpa3OpVaPaeYCY1UpzozN8zZOMfls_ImgffRiid",
        id: "cuisine-irish",
      },
      {
        name: "Israeli",
        image: null,
        id: "cuisine-israeli",
      },
      {
        name: "Italian",
        image:
          "https://lh3.googleusercontent.com/O9Ou_nbQHIX0RnhTZk1NUi8PEMDv6Q2dRZsxL0WxCuoqhc8r6AAb3X9QswNTYbAssiOmImprVbO0P_ryc1JDxg",
        id: "cuisine-italian",
      },
      {
        name: "Jamaican",
        image: null,
        id: "cuisine-jamaican",
      },
      {
        name: "Japanese",
        image:
          "https://lh3.googleusercontent.com/zGGrcKrQXCTAAT3iS1eos3QA9aR-88goxkasROdWQiyO12MBx-UopsucXBmv6it-jBmHVfhBhq__znjyB5dHlMw",
        id: "cuisine-japanese",
      },
      {
        name: "Jewish",
        image: null,
        id: "cuisine-jewish",
      },
      {
        name: "Kenyan",
        image: null,
        id: "cuisine-kenyan",
      },
      {
        name: "Kid-Friendly",
        image:
          "https://lh3.googleusercontent.com/YACbSchPt83H_xEiwcjEwRM0CKEkl4rmpRC4hRFzj6IMrTUBDoakPu_vt1f__us9N29Qdxa4Iz2yYVC0PFd8cg",
        id: "cuisine-kid-friendly",
      },
      {
        name: "Korean",
        image: null,
        id: "cuisine-korean",
      },
      {
        name: "Kosher",
        image: null,
        id: "cuisine-kosher",
      },
      {
        name: "Laotian",
        image: null,
        id: "cuisine-laotian",
      },
      {
        name: "Latin american",
        image: null,
        id: "cuisine-latin american",
      },
      {
        name: "Lebanese",
        image: null,
        id: "cuisine-lebanese",
      },
      {
        name: "Libyan",
        image: null,
        id: "cuisine-libyan",
      },
      {
        name: "Low country",
        image: null,
        id: "cuisine-low country",
      },
      {
        name: "Malaysian",
        image: null,
        id: "cuisine-malaysian",
      },
      {
        name: "Mandarin",
        image: null,
        id: "cuisine-mandarin",
      },
      {
        name: "Mediterranean",
        image:
          "https://lh3.googleusercontent.com/qGay6a83pFNXHqZ6j27EkraugSsxXb2raGj2jn9s9UNQUdCJ-wlgIinnI8HiEL5CBsgCqiBOlbuw-Pje-kjRLgA",
        id: "cuisine-mediterranean",
      },
      {
        name: "Mexican",
        image:
          "https://lh3.googleusercontent.com/KPITyA0uXrV11Kxm-4-yQKXLlzVTIU67tZu8oT6hw6guRBPqo11XvQx9WRgNGPb79xRLEqr50h3CG9diV04GAw",
        id: "cuisine-mexican",
      },
      {
        name: "Moroccan",
        image:
          "https://lh3.googleusercontent.com/YKHkwBrSkVhRqYnoDSqPXXhMLkQn-DWGs8Chyrvt0EbhA-4tBX6q48pUMQUjdo6T82XPtejKBauk--0lCQUGjw",
        id: "cuisine-moroccan",
      },
      {
        name: "Native american",
        image: null,
        id: "cuisine-native american",
      },
      {
        name: "Nepali",
        image: null,
        id: "cuisine-nepali",
      },
      {
        name: "New mexican",
        image: null,
        id: "cuisine-new mexican",
      },
      {
        name: "Nicaraguan",
        image: null,
        id: "cuisine-nicaraguan",
      },
      {
        name: "Nigerian",
        image: null,
        id: "cuisine-nigerian",
      },
      {
        name: "North african",
        image: null,
        id: "cuisine-north african",
      },
      {
        name: "Norwegian",
        image: null,
        id: "cuisine-norwegian",
      },
      {
        name: "Pakistani",
        image: null,
        id: "cuisine-pakistani",
      },
      {
        name: "Palestinian",
        image: null,
        id: "cuisine-palestinian",
      },
      {
        name: "Persian",
        image: null,
        id: "cuisine-persian",
      },
      {
        name: "Peruvian",
        image: null,
        id: "cuisine-peruvian",
      },
      {
        name: "Polish",
        image: null,
        id: "cuisine-polish",
      },
      {
        name: "Portuguese",
        image:
          "https://lh3.googleusercontent.com/l0AodLayvwDSXEdwGrd5Wi_v0Yk45voekPgBKK2qp5M0Gbj1oceOssXztxpe6S6A74dw76Ignk3yK_IUWx7pYEI",
        id: "cuisine-portuguese",
      },
      {
        name: "Puerto rican",
        image: null,
        id: "cuisine-puerto rican",
      },
      {
        name: "Quebec",
        image: null,
        id: "cuisine-quebec",
      },
      {
        name: "Russian",
        image: null,
        id: "cuisine-russian",
      },
      {
        name: "Salvadoran",
        image: null,
        id: "cuisine-salvadoran",
      },
      {
        name: "Samoan",
        image: null,
        id: "cuisine-samoan",
      },
      {
        name: "Scandinavian",
        image: null,
        id: "cuisine-scandinavian",
      },
      {
        name: "Scottish",
        image: null,
        id: "cuisine-scottish",
      },
      {
        name: "Sichuan",
        image: null,
        id: "cuisine-sichuan",
      },
      {
        name: "Singaporean",
        image: null,
        id: "cuisine-singaporean",
      },
      {
        name: "Slovak",
        image: null,
        id: "cuisine-slovak",
      },
      {
        name: "Soul food",
        image: null,
        id: "cuisine-soul food",
      },
      {
        name: "South african",
        image: null,
        id: "cuisine-south african",
      },
      {
        name: "South american",
        image: null,
        id: "cuisine-south american",
      },
      {
        name: "Southern & Soul Food",
        image:
          "https://lh3.googleusercontent.com/2FryJVwa3IX54VF5GJOR0RcCDTrq86yJDXQmNS9VN_e2V_9mRTr67If96Prg7HwcnHKWsYZkgu88W2azZAywgwE",
        id: "cuisine-southern",
      },
      {
        name: "Southwestern",
        image:
          "https://lh3.googleusercontent.com/2nNupqwMnQti8H2ma0oqusxxJScHCs0Nkb1a56xNC9uXwx_AuTPTro_VWu63Xq7dcIkySKirmR5wly2xv2sItGA",
        id: "cuisine-southwestern",
      },
      {
        name: "Spanish",
        image:
          "https://lh3.googleusercontent.com/iGsEolsDCb7bBIWMFg_d07SKkiSN8JZgmPH_f6kzmr2FY8CgD0qJB9FZ6YuKlDXZ1o12FRdqa0cQdBPHQ8MrOA",
        id: "cuisine-spanish",
      },
      {
        name: "Sri lankan",
        image: null,
        id: "cuisine-sri lankan",
      },
      {
        name: "Sudanese",
        image: null,
        id: "cuisine-sudanese",
      },
      {
        name: "Swedish",
        image:
          "https://lh3.googleusercontent.com/cEPYkjY7TFCsipPbnzvodJ4fsZIdKK_U1mVHw2gNVBm0HAHKYw9CYm9B1djvV-X0XX0aKdGhFNv2x3yW2FGI6RE",
        id: "cuisine-swedish",
      },
      {
        name: "Swiss",
        image: null,
        id: "cuisine-swiss",
      },
      {
        name: "Syrian",
        image: null,
        id: "cuisine-syrian",
      },
      {
        name: "Taiwanese",
        image: null,
        id: "cuisine-taiwanese",
      },
      {
        name: "Tanzanian",
        image: null,
        id: "cuisine-tanzanian",
      },
      {
        name: "Thai",
        image:
          "https://lh3.googleusercontent.com/HG8ehzT4_xgvLR418zQ5nn9_0SgF5y9AFIj0mPP387ci6onqGFTG0iCC7T8hweh3rDWc-JMhtJqXfYFDy0hzAw",
        id: "cuisine-thai",
      },
      {
        name: "Tongan",
        image: null,
        id: "cuisine-tongan",
      },
      {
        name: "Turkish",
        image: null,
        id: "cuisine-turkish",
      },
      {
        name: "Vietnamese",
        image: null,
        id: "cuisine-vietnamese",
      },
    ],
  },
  categories: {
    cuisines: [
      {
        name: "American",
        image:
          "https://lh3.googleusercontent.com/Xbw-2m9utpEabJC6yzDb1hRjVr5tVg_CHfWoJ5DfBo639tQD8GaRzetk2WocZy4EAtpQHZKFiYDSi-gWDKaNDQ",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-american)",
      },
      {
        name: "Barbecue",
        image:
          "https://lh3.googleusercontent.com/KgIroUovsFVOLl75nFLUhcaS_A8kJF0AOj1h1ncPWW3NwUhLA-Xd0_m9CkiV0yFFVdMO5f4bGAFp0O-fC37q",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-barbecue\\-bbq)",
      },
      {
        name: "Asian",
        image:
          "https://lh3.googleusercontent.com/8eRtqal5reIDYCfFEWOSW9M39bKBUlm6yuempjGbLdZ9AxlD81CiAcM9ioBrNmYimit6T63b7U6zuAsXrFKtIQ",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-asian)",
      },
      {
        name: "Italian",
        image:
          "https://lh3.googleusercontent.com/rHIb_lTyZNs99aLDZi8gV8C_mUo9fhvP3PWIkWes8GkLX8mHA5WeYiB3vPPyRsQFyBwdwoJ5iIZWTFcEzR836A",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-italian)",
      },
      {
        name: "Mexican",
        image:
          "https://lh3.googleusercontent.com/RqjD4wjwsCDhqXoRO93-dJgcDXNHvyq2tj5MYOaBNjg9ivDXAN0Cj1e4tHZ-DSqlTEPdRu7Bw07L6H7HSKX33A",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-mexican)",
      },
      {
        name: "French",
        image:
          "https://lh3.googleusercontent.com/Sy6DK1USAKjdQnrT0HzFb1FcPG7sRQA1pJX4cpgw3dATaZ9VjGbTjPfitoLLadPQbJRrfdHWxGpZYNdu77GP",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-french)",
      },
      {
        name: "Southwestern",
        image:
          "https://lh3.googleusercontent.com/sYLvtT3xcbiszvg52ZHuoXL6yKAIXQaghjGX8HSeZnXJ--59FKeybK-RjJSPVjj9Fj66Dqfk0K0LjzDNO3mQ",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-southwestern)",
      },
      {
        name: "Southern",
        image:
          "https://lh3.googleusercontent.com/MDKRiXdmIldXHhPYQvg49ipD-wRWFsRa_TY-463BnuWp8sOE9Nh1Mz3FlQXBjGs7bk-OhGITHx8-fqOTWEtIgCE",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-southern)",
      },
      {
        name: "Indian",
        image:
          "https://lh3.googleusercontent.com/0CcUpTEjo0DDYGz90gklGED9DgU6OEi_Cgpcb4IAwCZeVlyH0eKFC-AxHn_CDpQBAwBRclR099v-u_6bhUJpXUM",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-indian)",
      },
      {
        name: "English",
        image:
          "https://lh3.googleusercontent.com/gMnhs_JEtwSs5kxysuDT1_4V1yoC9U4P123DXDf-WF5mxIEYt0ghznsDimAZ3chlRU921VcdmZn49yK3MRZSvw",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-english)",
      },
      {
        name: "Chinese",
        image:
          "https://lh3.googleusercontent.com/EDIKeaEHzgzANTJqY9qAzOoc8WX3L9r6ClS2ZTIhslE5ay19kJsQJ1tf625T6pv7TL7we9Sec0pS-PaLVTOP5g",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-chinese)",
      },
      {
        name: "Mediterranean",
        image:
          "https://lh3.googleusercontent.com/YJzIk9PsrvFSA2Oe_Sk_y1VboEAG1Jct1sR2tntmABSoq29xIdVOkwZUtEbzq75UibHb7VHYDbY0C4iBLQEhsYk",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-mediterranean)",
      },
      {
        name: "Spanish",
        image:
          "https://lh3.googleusercontent.com/qhKAkDsIBVwOnTtlTt7VRi1pdOULy4cJ6GCXEkx8XCsluE21OlwOpkjA43hyVP2drC4ECBgLkxzSM9gPhkyy0yE",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-spanish)",
      },
      {
        name: "Greek",
        image:
          "https://lh3.googleusercontent.com/HXdKWAnBLGTYdonNQ9-Q3-M-qLdV04m1KEiNw4RfgxCdP4ZNPKqmVUoBzqGhutP3jhULthneT7D9Yhy3Zy_18yc",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-greek)",
      },
      {
        name: "Thai",
        image:
          "https://lh3.googleusercontent.com/ZV-Sj8KUACLOMIIMVvq-aobeU6wxG1jU8DjzRmoQAyPKFdn7Tx9dTIE5xCIQr6EV0B8U9TwOO37rvqMQOUNelQ",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-thai)",
      },
      {
        name: "Cajun",
        image:
          "https://lh3.googleusercontent.com/mxphMPV8BqxK0lgVeGet4LXOwhiQWQwmd7u0oe0bt1fLB2tW3U3dhnL9LURFlUyCLRYPNQI2tPkSX66pMggL",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-cajun)",
      },
      {
        name: "Irish",
        image:
          "https://lh3.googleusercontent.com/Ocn4VHvuHuFhUvS3DSt8k6hNZjfMXQ3wrnEifRujPQ_CYAJ7l5J_2JfoUb7erU77RtODJK-2uD8gRLZEUU8iuQ",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-irish)",
      },
      {
        name: "German",
        image:
          "https://lh3.googleusercontent.com/2cNCLGd-hJCyTS7Q5Mb9UijZan8t_v1rWLe1q1hNhjTNbPqp2S2vTD1Yh8MMQxLeG0lD96BZ8ziC9BO5d2dv",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-german)",
      },
      {
        name: "Moroccan",
        image:
          "https://lh3.googleusercontent.com/RSA_ifDZt0iZhWa7UOve2eancs2BZAEAVwEAdcuM9PYGy5hos7U9OtcEVfqG-aKj0d2B923kuYyKAPbzXRadhw",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-moroccan)",
      },
      {
        name: "Japanese",
        image:
          "https://lh3.googleusercontent.com/_DvlluBS8tLt5Dfogx8lri-LFihIwigYPilWKDs2yP6fovel_qN3WnM_xJI_f8yHofssqZWNIwR5EPD8QwUT",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-japanese)",
      },
      {
        name: "Cuban",
        image:
          "https://lh3.googleusercontent.com/PP-FAjmZZ9hmknNiIaL7VLgBBB1yK3lR5_JejiHBBxJwAxAlcZ8Kv1ddQK7n5LwNo-oOLN0ATAXYmuC5_FW1",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-cuban)",
      },
      {
        name: "Hawaiian",
        image:
          "https://lh3.googleusercontent.com/PZeNOaYfWpriw8NFie0wGAFFi_klHnXQT-Wgd63_RqIwUFtNreL0C3krXbSzCOYLc_Nz0KTpd9Y0h0HXWu6Jzg",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-hawaiian)",
      },
      {
        name: "Swedish",
        image:
          "https://lh3.googleusercontent.com/16A8OOPtMfCUDCuWHKyncZnbymPJ9o-7eBtJDdWrP0L9Cgm5VMEyI6znZi9qBddy_mHotPC7LdhXtFX0NS5w0Q",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-swedish)",
      },
      {
        name: "Portuguese",
        image:
          "https://lh3.googleusercontent.com/bv3sXa9CWuDyFsfquZae8wDcwGiwZNTyF26_K2QC7YMEgMg5-7OVpnEPVw-DLHwhcwgV0pMoQN8on0BDoI9-Sg",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-portuguese)",
      },
      {
        name: "Hungarian",
        image:
          "https://lh3.googleusercontent.com/Ru25stI2-cClmioDnoRWy1kdNZfEH_HKhDDM-M4XstlVCSbhIzvgbw7xR_Wd1ZIb4S9X0sZbmzz5H3_LUF2PbA",
        id: "list.recipe.search_based:fq:attribute_s_mv:(cuisine\\^cuisine\\-hungarian)",
      },
    ],
    courses: [
      {
        name: "Main Dishes",
        image:
          "https://lh3.googleusercontent.com/QbWCXqeQbBOYXvY-478gNd4heJusUyiQGDji-nzzysVuemVUL62eeF23Y-ug8O7kTdyIW4WchaAYg3YMhEk9",
        id: "list.recipe.search_based:fq:attribute_s_mv:(course\\^course\\-Main\\ Dishes)",
      },
      {
        name: "Desserts",
        image:
          "https://lh3.googleusercontent.com/N2dE2DRqXsMJd-i-3L72sreoh5ZnK9lTEYH3RWYXSPxEmqOXenGajTukOQQV5Ar3vIDtMo-f8cWWo_EAO0FE",
        id: "list.recipe.search_based:fq:attribute_s_mv:(course\\^course\\-Desserts)",
      },
      {
        name: "Appetizers",
        image:
          "https://lh3.googleusercontent.com/i0d8RhDt_kln2q0mmm7X8JFjBp4C_sThEVh5wGQHjRiTxYaRQ8ckRttVYLXzwCbMVFA409845Pt8urtPMbxrkg",
        id: "list.recipe.search_based:fq:attribute_s_mv:(course\\^course\\-Appetizers)",
      },
      {
        name: "Salads",
        image:
          "https://lh3.googleusercontent.com/Kqnp5-R0EDkG-Bbl6dpxe2K4gQBBwr4pObJuQ27qwQ2yV6Dc3mXxU3lWZUkvxXu2HdCBFA3xb_ZID895DPzxk38",
        id: "list.recipe.search_based:fq:attribute_s_mv:(course\\^course\\-Salads)",
      },
      {
        name: "Side Dishes",
        image:
          "https://lh3.googleusercontent.com/I3m-OFG5pytYJJ_PSezbCTAd9SCYtcrN2JxHBfDEntqu1adUUbSnhyoMbq8h-fi3i94MqCIV7sDCvf_h64dHRzg",
        id: "list.recipe.search_based:fq:attribute_s_mv:course\\^course\\-Side\\ Dishes",
      },
      {
        name: "Lunch",
        image:
          "https://lh3.googleusercontent.com/YpPxx28Xu42a01RUa_5ydQ0KPuEZ8Joz56fhM2dmKCdeO2_onPZPTJMLB5UE-iLWmpres9QGF0475PM8wfPe04Q",
        id: "list.recipe.search_based:fq:attribute_s_mv:course\\^course\\-Lunch",
      },
      {
        name: "Soups",
        image:
          "https://lh3.googleusercontent.com/_LgyClGZDTp73soMYF8CTl61AmvRQNeK3HmOvCu0H5-MUb0vcCE3uq0XUpfEK43dxkgvIRCbubVnpat1GL77",
        id: "list.recipe.search_based:fq:attribute_s_mv:(course\\^course\\-Soups)",
      },
      {
        name: "Breakfast and Brunch",
        image:
          "https://lh3.googleusercontent.com/gSSPZPQwymQVvPzAoeDiQ3eIKFV7r07GPMyfHsMKYk_uBqEZ4UHRL3nRNW8v8DZuWlwVEqdtEUoCAoS3g5RweUs",
        id: "list.recipe.search_based:fq:attribute_s_mv:course\\^course\\-Breakfast\\ and\\ Brunch",
      },
      {
        name: "Breads",
        image:
          "https://lh3.googleusercontent.com/dUFjFSi-3YuP04tqxgSRb5I2X-Cwr5T46hxKqr4X_du132j4P2qxMTUDLh-9azBR6jt7jexSblJbJKewdknPwOA",
        id: "list.recipe.search_based:fq:attribute_s_mv:(course\\^course\\-Breads)",
      },
      {
        name: "Beverages",
        image:
          "https://lh3.googleusercontent.com/j9UoZs7Po3CimIPjTyYDGYyEHMYDPj3tWJzRjke690yT9_RP9jokGDxhm8XJR72scxDU1U9t32B146aaOGYL",
        id: "list.recipe.search_based:fq:attribute_s_mv:(course\\^course\\-Beverages)",
      },
      {
        name: "Condiments and Sauces",
        image:
          "https://lh3.googleusercontent.com/IJnmvhalObC-gtkv1qxRZreHeyTRuF1SPLw0e884e_-1jKBLfMPhZRP8owJtSE5VAyZCc4fOu9OI-e7in04H",
        id: "list.recipe.search_based:fq:attribute_s_mv:course\\^course\\-Condiments\\ and\\ Sauces",
      },
      {
        name: "Cocktails",
        image:
          "https://lh3.googleusercontent.com/vkMDOt2kpoTuHjkRcgSHzSqLaFbTS8-r2qtrrLWvphr-Yq27k2z5pJULl-fBbJBEWgcAuOTe-oDMBH40z9AqXg",
        id: "list.recipe.search_based:fq:attribute_s_mv:(course\\^course\\-Cocktails)",
      },
    ],
    diets: [
      {
        name: "Lacto vegetarian",
        image:
          "https://lh3.googleusercontent.com/DVKqpujjwyPcIL5z2dAgnmBYTrfGm-tOjdvh4vGrmSg07tNNkapA1XyQcpOOkeQfDzh8XRrKLibKOK3X4yTpqUw",
        id: "list.recipe.search_based:fq:diet_inclusion_s_mv:388\\^Lacto\\ vegetarian",
      },
      {
        name: "Ovo vegetarian",
        image:
          "https://lh3.googleusercontent.com/AHAgngOXBw1MBU4HjsxFw9ox2wm7axk5x_XdXto8okpFVNeqmJL-ukbOwl0BmbsNh6iiFqizUPSGZssLeGMUug",
        id: "list.recipe.search_based:fq:diet_inclusion_s_mv:(389\\^Ovo\\ vegetarian)",
      },
      {
        name: "Paleo",
        image:
          "https://lh3.googleusercontent.com/HloQSkIYk8KINHC2Kw7Agt8UVcxVfx6zSBCYB76k3OygQy47nau8G-TOBGYVkOvN8CBecY7f00DOcPLXRkeIrA",
        id: "list.recipe.search_based:fq:diet_inclusion_s_mv:(403\\^Paleo)",
      },
      {
        name: "Pescetarian",
        image:
          "https://lh3.googleusercontent.com/Ioe7rSxgFxAxH_3aiA-EHACGZYeRWcIvEnYHSQIlR_6nCFUHfL-RYndYNCxxM1N_LaHPskI5gFuf1BAq1qiW",
        id: "list.recipe.search_based:fq:diet_inclusion_s_mv:390\\^Pescetarian",
      },
      {
        name: "Vegetarian",
        image:
          "https://lh3.googleusercontent.com/Pv45-HwBDZRw8yu-QWJQJ2m_77hfTNWRPpobN3J1Yx1BO_mFpB2jq9oT4hdjeC_AfS9JPmtneYbxbjq3QkTMtw",
        id: "list.recipe.search_based:fq:diet_inclusion_s_mv:387\\^Lacto\\-ovo\\ vegetarian",
      },
      {
        name: "Vegan",
        image:
          "https://lh3.googleusercontent.com/QAYf1Pw9sVAeP1CmEBoIG5fJzOc2gramNNMRq_hR0wnyc8fvMIPVavl_7XcRrHTVog-tqPDT3UVkMjp3ftTS1V0",
        id: "list.recipe.search_based:fq:diet_inclusion_s_mv:386\\^Vegan",
      },
    ],
  },
});

export default FeedStore;