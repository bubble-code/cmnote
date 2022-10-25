
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Col, Row, Typography } from "antd";

export const WriteNote = ({ noteEdit, handleSave }) => {

    const handleEditorSave = (content) => {
        console.log(content);
    };

    return (
        <Col span={24} style={{ minHeight: '70vh', padding: '0px 20px 0px 20px', marginTop: '50px' }} >
            <Row style={{ marginBottom: '10px' }}>
                <Col span={6}>
                    <Typography.Title level={5} >{noteEdit.cn}</Typography.Title>
                </Col>
                <Col span={2}>
                    <Typography.Text level={5}>{moment(noteEdit.timeStart, 'HH:mm').format('HH:mm')}</Typography.Text>
                </Col>
                <Col span={2}>
                    <Typography.Text level={5}>{moment(noteEdit.timeEnd, 'HH:mm').format('HH:mm')}</Typography.Text>
                </Col>
                <Col span={8}>
                    <Button type='primary' onClick={handleEditorSave} >Save</Button>
                </Col>
            </Row>
            <Editor
                apiKey='jgtl5czj43aj8fysglacem8dii96jgui2meic2tj27f0cfb4'
                value={noteEdit.sNote}
                init={{
                    height: 800,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Courier new,Arial,sans-serif; font-size:14pt ;line-height: 1.8rem; }'
                }}
            // value={'snkadnsdnla'}
            // onEditorChange={handleEditorChange}
            />
        </Col>
    )
}

export default WriteNote