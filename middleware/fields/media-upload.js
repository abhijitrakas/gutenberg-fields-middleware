const { MediaUpload } = wp.blocks;
const { Button } = wp.components;
const { __ } = wp.i18n;

const mediaUpload = ( props, attribute, attributeKey ) => {
	const buttonText = attribute.field.buttonText ? attribute.field.buttonText : __( 'Open Media Library' );

	const fieldAttributes = _.extend( {
		onSelect( media ) {
			const newAttributes = {};
			newAttributes[ attributeKey ] = media;
			props.setAttributes( newAttributes );
		},
		type: 'image',
		value: props.attributes[ attributeKey ],
		render( { open } ) {
			return (
				<Button onClick={ open }>
					{ buttonText }
				</Button>
			);
		},
	}, attribute.field );

	delete fieldAttributes.buttonText;

	return (
		<MediaUpload
			{ ...fieldAttributes }
		/>
	);
};

export default mediaUpload;