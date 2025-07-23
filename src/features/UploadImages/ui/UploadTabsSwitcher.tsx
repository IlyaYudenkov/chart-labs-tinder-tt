import { TabSwitcher } from '@/shared/UI/TabSwitcher';
import { IOptionsTab } from '@/shared/UI/TabSwitcher/model/tabSwitcher.model';
import { useEffect, useState } from 'react';
import {
    STEP_PHOTOS_EDIT_TAB,
    STEP_PHOTOS_OPTIONS_TAB_ARRAY,
    STEP_PHOTOS_PREVIEW_TAB,
} from '../data/uploadImages.data';
import { EditTab } from './EditTab/EditTab';
import { PreviewTab } from './PreviewTab/PreviewTab';
import { useAppDispatch } from '@/app/store';
import { setPhotos } from '@/app/store/auth/authSlice';

export const UploadTabsSwitcher = () => {
    //STATE
    const [selectedTab, setSelectedTab] = useState<IOptionsTab>(STEP_PHOTOS_EDIT_TAB);
    const [images, setImages] = useState<(string | null)[]>(Array(9).fill(null));

    //RTK
    const dispatch = useAppDispatch();

    //EFFECT
    useEffect(() => {
        dispatch(setPhotos(images));
    }, [images]);

    return (
        <div>
            <TabSwitcher
                optionsTab={STEP_PHOTOS_OPTIONS_TAB_ARRAY}
                selectedOption={selectedTab}
                setSelectedOption={setSelectedTab}
            />
            <div className="bg-gray-light">
                {selectedTab === STEP_PHOTOS_EDIT_TAB && (
                    <EditTab images={images} setImages={setImages} />
                )}
                {selectedTab === STEP_PHOTOS_PREVIEW_TAB && <PreviewTab />}
            </div>
        </div>
    );
};
