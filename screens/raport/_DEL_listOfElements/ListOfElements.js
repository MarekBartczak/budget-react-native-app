import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useSelector } from "react-redux";
import HTML from "react-native-render-html";
import XLSX from "xlsx";

import * as FileSystem from "expo-file-system";
const ListOfElements = (props) => {
  const listObj = {
    expense: useSelector((state) => state.item.items),
    fixedExpense: useSelector((state) => state.fixedExpense.fixedExpense),
    income: useSelector((state) => state.income.income),
    fixedIncome: useSelector((state) => state.fixedIncome.fixedIncome),
  };

  var data = [
    {
      name: "John",
      city: "Seattle",
    },
    {
      name: "Mike",
      city: "Los Angeles",
    },
    {
      name: "Zach",
      city: "New York",
    },
  ];

  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cities");
  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  const uri = FileSystem.cacheDirectory + "cities.xlsx";
  const faxeXLSX = async () => {
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(uri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "MyWater data",
      UTI: "com.microsoft.excel.xlsx",
    });
  };

  //   const elemenets = (list) => {
  //     return list.map(
  //       (el) =>
  //         `<br/>${el.date.replaceAll("-", ".")} ${el.cost}zł ${el.title} ${
  //           el.recipient
  //         }`
  //     );
  //   };
  //   const elemenetsExpense = (list) => {
  //     return list.map(
  //       (el) =>
  //         `<br/>${el.date.replaceAll("-", ".")} ${el.cost}zł ${el.title} ${
  //           el.category
  //         }`
  //     );
  //   };
  //   const title = "Raport";
  //   const htmlContent = `
  //         <!DOCTYPE html>
  //         <html lang="en">
  //         <head>
  //             <meta charset="UTF-8">
  //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //             <title>Pdf Content</title>
  //             <style>
  //                 body {
  //                     font-size: 16px;
  //                     color: rgb(0, 0, 0);
  //                 }

  //                 h1 {
  //                     text-align: center;
  //                 }
  //                 p {
  //                     text-align: left;
  //                 }

  //             </style>
  //         </head>
  //         <body>
  //             <h1>${title}</h1>
  //             <hr>

  //             <h3> Stałe wydatki</h3>
  //             ${elemenets(listObj.fixedExpense)}
  //             <h3> Wydatki </h3>
  //             ${elemenetsExpense(listObj.expense)}

  //         </body>
  //         </html>
  //     `;
  //   const createPDF = async (html) => {
  //     try {
  //       const { uri } = await Print.printToFileAsync({ html });
  //       return uri;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   const createAndSavePDF = async (html) => {
  //     try {
  //       const { uri } = await Print.printToFileAsync({ html });
  //       await Sharing.shareAsync(uri);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const contentWidth = useWindowDimensions().width;

  //   //   console.log(listObj.expense);

  return (
    <View>
      <TouchableOpacity onPress={() => faxeXLSX()}>
        <Text>generate PDF</Text>
      </TouchableOpacity>
      {/* <ScrollView style={{ width: Dimensions.get("window").width }}>
        <HTML
          source={{ html: htmlContent }}
          contentWidth={Dimensions.get("window").width * 0.8}
        />
      </ScrollView> */}
    </View>
  );
};
export default ListOfElements;
