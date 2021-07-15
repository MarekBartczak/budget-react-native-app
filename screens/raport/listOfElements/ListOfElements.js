import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useSelector } from "react-redux";
import HTML from "react-native-render-html";

const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }

            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Hello, UppLabs!</h1>
    </body>
    </html>
`;
const createPDF = async (html) => {
  try {
    const { uri } = await Print.printToFileAsync({ html });
    console.log(uri);
    return uri;
  } catch (err) {
    console.error(err);
  }
};

const createAndSavePDF = async (html) => {
  try {
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error(error);
  }
};

const ListOfElements = (props) => {
  const listObj = {
    expense: useSelector((state) => state.item.items),
    fixedExpense: useSelector((state) => state.fixedExpense.fixedExpense),
    income: useSelector((state) => state.income.income),
    fixedIncome: useSelector((state) => state.fixedIncome.fixedIncome),
  };

  const contentWidth = useWindowDimensions().width;
  const htmlView = () => {
    return (
      <ScrollView style={{ flex: 1 }}>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
      </ScrollView>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => createAndSavePDF(htmlContent)}>
        <Text>generate PDF</Text>
      </TouchableOpacity>
      <ScrollView style={{ flex: 1 }}>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
      </ScrollView>
    </View>
  );
};
export default ListOfElements;
