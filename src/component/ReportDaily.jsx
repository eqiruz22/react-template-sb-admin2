import React from 'react'
import { Document, View, Text, Page, StyleSheet, Image, Font } from '@react-pdf/renderer'

Font.register({
    family: 'Noto1',
    src: '/fonts/Noto/NotoSans-Black.ttf'
})

const styles = StyleSheet.create({
    head: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20,
        textDecoration: 'underline',
        fontWeight: 'bold',
        fontFamily: 'Noto1'
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
        fontFamily: 'Noto1'
    },
    tableCol: {
        margin: 'auto',
        width: "50%",
        marginTop: 10,
        marginLeft: 5,
        borderStyle: "solid",
        borderWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        marginTop: 5,
        fontSize: 10
    },
    tableColm1: {
        margin: 'auto',
        marginTop: 25,
        width: "25%",
        borderStyle: "solid",
        borderWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell1: {
        marginTop: 25,
        fontSize: 10,
        textDecoration: 'underline'
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
                        <Image src={"/img/logo.png"} />
                        <Text style={styles.head}>SURAT PERJALANAN DINAS</Text>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Name : {selectedUser.name}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Jabatan : {selectedUser.title_name}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Departement : {selectedUser.divisi_name}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Job Class : </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Maksud Perjalanan : {selectedUser.official_travel_site}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Tempat Tujuan : {selectedUser.purposes}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Tanggal Berangkat : {newDate} - {endDate}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Lama Perjalanan : {selectedUser.days} Hari {selectedUser.days} Malam</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <Text style={styles.head}>PENERIMAAN DIMUKA(ADVANCE)</Text>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Transport ke tujuan : {selectedUser.transport.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Transport Local : {selectedUser.local_transport.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Penginapan : {selectedUser.days} Malam {selectedUser.hotel.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Meals : {selectedUser.days} Hari {selectedUser.meal_allowance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Allowance : {selectedUser.days} Hari {selectedUser.hardship_allowance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Rapid Test : Rp -</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Lain-lain : {selectedUser.others.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Jumlah Advance : {selectedUser.total_received.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColm1}>
                                <Text style={styles.tableCell}>Diintrusikan oleh</Text>
                            </View>
                            <View style={styles.tableColm1}>
                                <Text style={styles.tableCell}>Disetujui oleh</Text>
                            </View>
                            <View style={styles.tableColm1}>
                                <Text style={styles.tableCell}>Advance Diterima oleh</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColm1}>
                                <Text style={styles.tableCell1}>{selectedUser.proses} {selectedUser.approved_divisi}</Text>
                            </View>
                            <View style={styles.tableColm1}>
                                <Text style={styles.tableCell1}>{selectedUser.proses} {selectedUser.approved_hc}</Text>
                            </View>
                            <View style={styles.tableColm1}>
                                <Text style={styles.tableCell1}>{selectedUser.name}</Text>
                            </View>
                        </View>
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