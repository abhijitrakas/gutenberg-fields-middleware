/**
 * Text field.
 */

const { RichText } = wp.blocks;

export default function richText( props, config, attributeKey ) {
	const defaultAttributes = {

		onChange( value ) {
			const newAttributes = {};
			newAttributes[ attributeKey ] = value;
			props.setAttributes( newAttributes );
		},

		value: props.attributes[ attributeKey ] || '',
	};

	const fieldAttributes = _.extend( defaultAttributes, config );

	delete fieldAttributes.type;

	return (
		<RichText
			{ ...fieldAttributes }
		/>
	);
}
