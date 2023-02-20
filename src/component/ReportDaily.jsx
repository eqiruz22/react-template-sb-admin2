import React from 'react'
import { Document, View, Text, Page, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    head: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    body: {
        fontSize: 10
    },
    total: {
        marginLeft: 300
    }
})


const ReportDaily = ({ selectedUser }) => {
    let start = {
        startDate: selectedUser.start_date,
        endDate: selectedUser.end_date
    }
    let date = new Date(start.startDate)
    let end = new Date(start.endDate)
    let newDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    let endDate = end.getDate() + "/" + (end.getMonth() + 1) + "/" + end.getFullYear()

    if (selectedUser['perdin'] !== 0) {
        return (
            <Document>
                <Page size="A4">
                    <View>
                        <Text style={styles.head}>Report</Text>
                        <Text style={styles.body}>Name: {selectedUser.name}</Text>
                        <Text style={styles.body}>Level: {selectedUser.title_name}</Text>
                        <Text style={styles.body}>PRJ NO: {selectedUser.prj_name}</Text>
                        <Text style={styles.body}>Official Travel Site: {selectedUser.official_travel_site}</Text>
                        <Text style={styles.body}>Long Tour Of Duty: {selectedUser.days} days/months</Text>
                        <Text style={styles.body}>Date: {newDate} - {endDate}</Text>
                        <Text style={styles.body}>Purposes Bussiness: {selectedUser.purposes}</Text>
                        <Text style={styles.body}>Hotel: {selectedUser.hotel}</Text>
                        <Text style={styles.body}>Rented House: </Text>
                        <Text style={styles.body}>Meal Allowance: </Text>
                        <Text style={styles.body}>Hardship Allowance: </Text>
                        <Text style={styles.body}>Pulse / Comm. Allow.: </Text>
                        <Text style={styles.body}>Local Transportation: {selectedUser.transport}</Text>
                        <Text style={styles.body}>Local Transportation-Area: {selectedUser.local_transport}</Text>
                        <Text style={styles.body}>Airfare/Bus/Travel/Train: {selectedUser.airfare}</Text>
                        <Text style={styles.body}>Car/Motor Rental: </Text>
                        <Text style={styles.body}>Airport Tax: {selectedUser.airport_tax}</Text>
                        <Text style={styles.body}>Entertainment: {selectedUser.entertainment}</Text>
                        <Text style={styles.body}>Fee Support Worker: {selectedUser.fee_support}</Text>
                        <Text style={styles.body}>ATK: {selectedUser.tools}</Text>
                        <Text style={styles.body}>Others: {selectedUser.others}</Text>
                        <Text style={styles.total}>Total Received:Rp {selectedUser.total_received.toLocaleString().split(',').join('.')}</Text>
                    </View>
                </Page>
            </Document>
        )
    } else {
        return (
            <Document>
                <Page size='A4'>
                    <View>
                        <Text>No Data</Text>
                    </View>
                </Page>
            </Document>
        )
    }
}

export default ReportDaily