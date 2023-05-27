import { TextField } from "react-native-material-textfield";
import React from "react";
import { View, ToastAndroid } from "react-native";

const Edit_Text = Props => {
  // const font = Props.fontFamily ? Props.fontFamily : "lucida grande";
  return (
    <View>
      <TextField
        // labelTextStyle={{ fontFamily: font }}
        // titleTextStyle={{ fontFamily: font }}
        // affixTextStyle={{ fontFamily: font }}
        // style={{ fontFamily: font }}
        inputContainerStyle={{borderBottomWidth:0}}
        // underlineColorAndroid='#FFF'
        // activeLineWidth = 0
        secureTextEntry={Props.secureTextEntry ? Props.secureTextEntry : false}
        keyboardType={Props.keyboardType ? Props.keyboardType : "default"}
        editable={Props.editable ? Props.editable : true}
        disabled={Props.disabled ? Props.disabled : false}
        label={Props.labelText ? Props.labelText : ""}
        labelFontSize={Props.labelFontSize ? Props.labelFontSize : 14}
        labelHeight={Props.labelHeight ? Props.labelHeight : 12}
        labelPadding={Props.labelPadding ? Props.labelPadding : 10}
        titleFontSize={Props.titleFontSize ? Props.titleFontSize : 12}
        fontSize={Props.fontSize ? Props.fontSize : 14}
        textColor={Props.textColor ? Props.textColor : "#000"}
        lineWidth={Props.lineWidth ? Props.lineWidth : 0.0}
        disabledLineType={
          Props.disabledLineType ? Props.disabledLineType : "solid"
        }
        disabledLineWidth={
          Props.disabledLineWidth ? Props.disabledLineWidth : 0
        }
        placeholderTextColor={
          Props.placeholderTextColor ? Props.placeholderTextColor : "#B3AFAF"
        }
        autoCorrect={Props.autoCorrect ? Props.autoCorrect : false}
        enablesReturnKeyAutomatically={
          Props.enablesReturnKeyAutomatically
            ? Props.enablesReturnKeyAutomatically
            : true
        }
        inputContainerPadding={
          Props.inputContainerPadding ? Props.inputContainerPadding : 13
        }
        tintColor={Props.tintColor ? Props.tintColor : "#B3AFAF"}
        baseColor={Props.baseColor ? Props.baseColor : "#B3AFAF"}
        errorColor={Props.errorColor ? Props.errorColor : "#ff3333"}
        errorfontSize={Props.errorfontSize ? Props.errorfontSize : 8}
        placeholder={Props.placeholder ? Props.placeholder : ""}
        multiline={Props.multiline ? Props.multiline : false}
        numberOfLines={Props.numberOfLines ? Props.numberOfLines : 1}
        //Must Include in Every
        onChangeText={
          Props.onChangeText
            ? Props.onChangeText
            : ToastAndroid.show("Text is changed", ToastAndroid.SHORT)
        }
        error={Props.error ? Props.error : Props.error}
        value={Props.value ? Props.value : Props.value}
        onBlur={Props.onBlur ? Props.onBlur : null}
        onFocus={Props.onFocus ? Props.onFocus : null}
      />
    </View>
  );
};

export default Edit_Text;
