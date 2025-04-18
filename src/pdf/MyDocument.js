import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { Form } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    flexGrow: 1,
    gap: 20,
    fontSize: 25,
    fontFamily: "Helvetica",
  },
  subSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 20,
    borderBottom: "1px solid grey",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 4,
  },
  mainTitle: {
    display: "flex",
    flexDirection: "column",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 1.2,
  },
  title: {
    fontSize: 24,
  },
  subTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid black",
    marginBottom: 5,
    marginTop: 20,
    fontSize: 20,
  },
  heading: {
    fontSize: 26,
    lineHeight: 1.2,
    textAlign: "center",
    fontWeight: 900,
  },
  backBtn: {},
  descText: {
    width: "80%",
    textAlign: "left",
  },
signSection:{
  display:'flex',
  flexDirection:'row',
 
  gap:10,
  justifyContent:'space-between',
  alignContent:'space-between',

  // border:'1px solid red',
  
},
  signSubsection:{
    display:'flex',
    flexDirection:'column',
    // border:'1px solid black',
    width:'50%'
  },
  border:{
    marginTop:50,
    borderBottom:'2px solid black'
  },
  signedText:{
    fontSize:20,
    textAlign:'center'
  }
});

const MyDocument = ({ chunks }) => (
  <Document>
    {chunks.map((chunk) => (
      <Page size="A4" style={styles.page}>
        <View>
          {chunk?.map((each, i) => (
            <View key={i} style={styles.section}>
              <Text style={styles.heading}>{each.heading}</Text>
              {each.presentedBy && (
                <Text style={styles.heading}>
                  Presented By: {each.presentedBy}
                </Text>
              )}
              {each.month && (
                <Text style={styles.heading}>
                  For the Month of {each.month}{" "}
                  {new Date(Date.now()).getFullYear()}
                </Text>
              )}

              {each.name && <Text style={styles.subTitle}>{each.name}</Text>}

              {each?.items.map((each, i) => (
                <View key={i} style={styles.subSection}>
                  <Text style={styles.descText}>
                    {each.incomeSource || each.desc}
                  </Text>
                  <Text>{each.amount}</Text>
                </View>
              ))}
              {each.name === "Sign" && (
                <View style={styles.signSection}>
                  <View style={styles.signSubsection}>
                    <Text style={styles.border}></Text>
                    <Text style={styles.signedText}>{each.signedByOne}</Text>
                  </View>

                  <View style={styles.signSubsection}>
                    <Text style={styles.border}></Text>
                    <Text style={styles.signedText}>{each.signedByTwo}</Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
    ))}
  </Document>
);

export default MyDocument;
