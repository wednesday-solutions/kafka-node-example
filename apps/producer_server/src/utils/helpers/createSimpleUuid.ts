const createSimpleUuid = (value: number): string => {
    const format = "00000000-0000-0000-0000-000000000000";
    const valueString = value.toString();

    return `${format.slice(0, Math.max(0, format.length - valueString.length))}${valueString}`;
};

export default createSimpleUuid;
