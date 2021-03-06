/**
 * Copyright © 2015 - 2017 EntDIY JavaEE Development Framework
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.entdiy.locale.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Lob;

/**
 * 大文本类型国际化数据
 */
@Getter
@Setter
@Embeddable
public class LocalizedText extends LocalizedData {

    @Lob
    @Column(nullable = true)
    @JsonIgnore
    private String zhCN;

    @Lob
    @JsonIgnore
    private String zhTW;

    @Lob
    @JsonIgnore
    private String enUS;

    @Lob
    @JsonIgnore
    private String jaJP;
}
