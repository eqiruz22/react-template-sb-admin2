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
                                <Text style={styles.tableCell}>Job Class : {selectedUser.title_name}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Maksud Perjalanan : {selectedUser.maksud_perjalanan}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Tempat Tujuan : {selectedUser.tempat_tujuan}</Text>
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
                                <Text style={styles.tableCell}>Lama Perjalanan : {selectedUser.lama_perjalanan} Hari {selectedUser.lama_perjalanan} Malam</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <Text style={styles.head}>PENERIMAAN DIMUKA(ADVANCE)</Text>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Transport ke tujuan : {selectedUser.transport_tujuan}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Transport Local : {selectedUser.transport_local}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Penginapan : {selectedUser.penginapan} - {selectedUser.lama_perjalanan} malam</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Meals : {selectedUser.lama_perjalanan} Hari {selectedUser.meals}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Allowance : {selectedUser.days} Hari {selectedUser.allowance}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Rapid Test : {selectedUser.rapid}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Lain-lain : {selectedUser.lain}</Text>
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
                                <Text style={styles.tableCell}>Jumlah Advance : {selectedUser.jumlah_advance}</Text>
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