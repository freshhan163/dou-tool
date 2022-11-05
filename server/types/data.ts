export interface Res {
    msg: string;
    st: number;
}

export interface DataItem {
    data_head: {
        index: {
            index_tip: string; // 描述
            index_name: string; // 指标英文名
            index_display: string; // 指标中文名
            change_value: {
                value: number;
                unit: string; // 单位
            }
            value: {
                value: number;
                unit: string; // 单位
            };
        }
    }
}

export interface DataRes extends Res {
    data: {
        data: {
            index_list: DataItem[];
        }
    }
}

// 接口请求参数
export interface DataParams {
    product_id?: number;
    begin_date?: string; // 当天的 00:00，2022/11/05 00:00:00
    end_date?: string; // 当天的 00:00，比如 2022/11/05 00:00:00
    msToken?: string;
    'X-Bogus'?: string;
}
