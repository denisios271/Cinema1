interface iTeamMemberLink {
    title: string,
    uri: string,
}

export default interface iTeamMember {
    name: string,
    roles: string,
    links: iTeamMemberLink[],
    image_uri: string,
}