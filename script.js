

104

​

105

    root.appendChild(list);

106

​

107

    return root;

108

}

109

​

110

function mcHandleStatus(parent, server, code, status) {

111

    var root = document.createElement("div");

112

    root.classList.add("mc-status-root");

113

​

114

    // Server IP:

115

    var header = document.createElement("h1");

116

    header.classList.add("mc-status-header");

117

    header.appendChild(document.createTextNode(server));

118

    root.appendChild(header);

119

​

120

    // MOTD:

121

    var descriptionRaw = [{

122

        "bold": true,

123

        "color": "red",

124

        "italic": false,

125

        "obfuscated": false,

126

        "strikethrough": false,

127

        "text": "Server offline",

128

        "underlined": false

129

    }];

130

​

131

    if (code == 200) {

132

        descriptionRaw = status["description"];

133

    }

134

    var description = mcDescriptionToHTML(descriptionRaw);

135

    root.appendChild(description);

136

​

137

    // Player Status:

138

    if (code == 200) {

139

        var playersRaw = status["players"];

140

        var players = mcPlayersToHTML(playersRaw);

141

        root.appendChild(players);

142

    }

143

​

144

    parent.appendChild(root);

145

}

146

​

147

window.onload = function() {

148

    var elements = document.getElementsByClassName("mc-status");

149

    for (let element of elements) {

150

        mcStatus(element, element.attributes.getNamedItem("data-mc-server").value);

151

    }

152

}

153

​

