import React, { useState } from 'react';
import { Supplier } from '../SupplierDetails/supplierDetails';

interface Yarn {
    key: number;
    name: string,
    deniers: number;
    filaments: number;
    wt: number;
    color: string;
}

interface Supplier {
    key: number;
    name: string;
    contact: string;
    yarnDets: Yarn;
}

interface Props {
    supplier: Supplier;
    yarn: Yarn;
}


const RawMaterialItem: React.FC<Props> = ({ supplier, yarn }) => {
    const { name, contact, yarnDets } = supplier;
    const {key, deniers, filaments, wt, color} = yarn;

    return (
        <div className='w-full h-[5vh] bg-zinc-200'>
            <div className='flex gap-4'>
                <p>{yarn.key}</p>
                <p>{yarn.deniers}</p>
                <p>{yarn.filaments}</p>
                <p>{yarn.wt}</p>
                <p>{yarn.color}</p>
                <Supplier />
            </div>
        </div>
    );
};

export default RawMaterialItem;
