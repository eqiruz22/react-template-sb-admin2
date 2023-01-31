import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import React from 'react'

const styles = StyleSheet.create({
    head: {
        fontSize: 50,
        color: 'blue',
        textAlign: 'center',
        marginTop: 20
    },
    total: {
        marginLeft: 300
    }
})

const Report = ({ selectedUser }) => {

    let start = {
        startDate: selectedUser.start_date,
        endDate: selectedUser.end_date
    }
    let date = new Date(start.startDate)
    let end = new Date(start.endDate)
    let newDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    let endDate = end.getDate() + "/" + (end.getMonth() + 1) + "/" + end.getFullYear()


    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text style={styles.head}>Report</Text>
                    <Text>Name: {selectedUser.name}</Text>
                    <Text>PRJ NO: {selectedUser.prj_name}</Text>
                    <Text>Title: {selectedUser.title_name}</Text>
                    <Text>Official Travel Site: {selectedUser.official_travel_site}</Text>
                    <Text>Purposes Bussiness: {selectedUser.purposes}</Text>
                    <Text>Date: {newDate} - {endDate}</Text>
                    <Text style={styles.total}>Total Received:Rp {selectedUser.total_received.toLocaleString().split(',').join('.')}</Text>
                </View>
            </Page>
        </Document>
    )
}

export default Report