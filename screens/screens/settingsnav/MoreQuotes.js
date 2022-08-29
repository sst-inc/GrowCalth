import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MoreQuotes = () => {
    const [quotes, setQuotes] = useState("")
    const [Quote, setQuote] = useState();
    const [Author, setAuthor] = useState();
    const getQuote = () => {

        fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        setQuote(result.content)
        setAuthor(result.author)
    })
    }
    useEffect(() => {
        getQuote();
    }, []);
    return (
        <View style={{backgroundColor: 'white', borderRadius: 15, height: 160, width: 400, marginLeft: 13, top: 10}}>
            <Text style={{paddingTop: 10, paddingHorizontal: 10, fontSize: 18, fontWeight: '900', color: '#100F0F'}}>{Quote}</Text>
        <Text style={{paddingHorizontal: 205, paddingTop: 5, fontStyle: 'italic', fontWeight: '600', fontSize: 17, color: '#100F0F', justifyContent: 'center', alignItems: 'center', textDecorationLine: 'underline', top: 15, left: 20}}>{Author}</Text>
        </View>
    )
}

export default MoreQuotes;

const styles = StyleSheet.create({})
