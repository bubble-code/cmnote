

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateBilling } from "../../Redux/Reducers/BillingByCmReducer";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Col, Input, Row, Typography } from "antd";
import { useEffect } from "react";

export const WriteNote = ({ noteEdit, handleSave }) => {
    const dispatch = useDispatch();
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setContent(noteEdit.sNote);
        }
    }, [noteEdit]);

    var currentAuthor = 'A Tiny User'
    var userAllowedToResolve = 'Admin1'
    const submitNote = ({ status = 'open', isInProcess = true }) => {
        dispatch(updateBilling({ data: { ...noteEdit, sNote: editorRef.current.getContent(), isInProcess, status } }));
    };

    return (
        <Col span={24} style={{ minHeight: '70vh', padding: '0px 20px 0px 20px', marginTop: '50px' }} >
            <Row style={{ marginBottom: '10px' }}>
                <Col span={5}>
                    <Typography.Title level={5} >{noteEdit.cn}</Typography.Title>
                </Col>
                <Col span={2}>
                    <Input type="number" placeholder="Setting" size="small" />
                </Col>
                <Col span={2}></Col>
                <Col span={2}>
                    <Typography.Text level={5}>{moment(noteEdit.timeStart, 'HH:mm').format('HH:mm')}</Typography.Text>
                </Col>
                <Col span={2}>
                    <Typography.Text level={5}>{moment(noteEdit.timeEnd, 'HH:mm').format('HH:mm')}</Typography.Text>
                </Col>
                <Col span={3}>
                    <Button type='primary' onClick={() => submitNote({ status: 'open' })}  >Save</Button>
                </Col>
                <Col span={3}>
                    <Button type='default' onClick={() => submitNote({ status: 'completed', isInProcess: false })} style={{ border: 'solid 1px grey', color: 'red' }} >Finish</Button>
                </Col>
            </Row>
            <Editor
                apiKey='jgtl5czj43aj8fysglacem8dii96jgui2meic2tj27f0cfb4'
                // value={noteEdit.sNote}

                onInit={(evt, editor) => {
                    editorRef.current = editor
                }}
                init={{
                    height: 800,
                    menubar: true,
                    menu: {
                        tc: {
                            title: 'Comments',
                            items: 'addcomment showcomments deleteallconversations'
                        }
                    },
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                        'emoticons',
                        'paste code tinycomments',
                    ],
                    tinycomments_can_resolve: function (req, done, fail) {
                        var allowed = req.comments.length > 0 &&
                            req.comments[0].author === currentAuthor;
                        done({
                            canResolve: allowed || currentAuthor === userAllowedToResolve
                        });
                    },
                    tinycomments_mode: 'embedded',
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Courier new,Arial,sans-serif; font-size:14pt ;line-height: 1.8rem; }',
                    setup: function (editor) {
                        editor.on('SkinLoaded', function () {
                            editor.execCommand("ToggleSidebar", false, "showcomments", { skip_focus: true });
                        })
                    }
                }
                }
            // value={'snkadnsdnla'}
            // onEditorChange={handleEditorChange}
            />
        </Col>
    )
}

export default WriteNote