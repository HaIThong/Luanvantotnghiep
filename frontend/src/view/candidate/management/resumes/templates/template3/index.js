import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IoCalendarClear } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { IoIosLink } from 'react-icons/io';
import FlexInput, {
  InputReadOnly,
} from '../../../../../../components/FlexInput';
import { ContentItem, InforPart } from '../../components';
import { useContext, useEffect, useRef, useState } from 'react';
import { CandidateContext } from '../../../layouts/CandidateLayout';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';

export default function Template3({
  basicInfor,
  setBasicInfor,
  fullname,
  cvEducations,
  setCvEducations,
  cvExperiences,
  setCvExperiences,
  cvProjects,
  setCvProjects,
  cvSkills,
  setCvSkills,
  cvCertificates,
  setCvCertificates,
  cvPrizes,
  setCvPrizes,
  cvActivities,
  setCvActivities,
  cvOthers,
  setCvOthers,
  parts,
  register,
  handleSubmit,
  errors,
  onSubmit,
  handleDownload,
}) {
  const { cvMode } = useContext(CandidateContext);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const Skill = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
      if (name) cvSkills[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (description) cvSkills[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);

    return (
      <div className="content">
        <FlexInput
          innerClassName={clsx('fw-550', bgColor)}
          placeholder="Tên kỹ năng"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Certificate = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [receiveDate, setReceiveDate] = useState('');
    useEffect(() => {
      if (name) cvCertificates[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (receiveDate) cvCertificates[index].receive_date = receiveDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiveDate]);

    return (
      <div className="content d-flex">
        <FlexInput
          className="w-20"
          innerClassName={clsx('fw-550 ts-sm', bgColor)}
          placeholder="Tgian nhận"
          defaultValue={
            infor.receive_date
              ? dayjs(infor.receive_date).format('MM/YYYY')
              : null
          }
          setCurrent={setReceiveDate}
        />
        <FlexInput
          className="flex-fill"
          innerClassName={clsx(bgColor)}
          placeholder="Tên chứng chỉ"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
      </div>
    );
  };
  const Prize = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [receiveDate, setReceiveDate] = useState('');
    useEffect(() => {
      if (name) cvPrizes[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (receiveDate) cvPrizes[index].receive_date = receiveDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiveDate]);

    return (
      <div className="content d-flex">
        <FlexInput
          className="w-20"
          innerClassName={clsx('fw-550 ts-sm', bgColor)}
          placeholder="Tgian nhận"
          defaultValue={
            infor.receive_date
              ? dayjs(infor.receive_date).format('MM/YYYY')
              : null
          }
          setCurrent={setReceiveDate}
        />
        <FlexInput
          className="flex-fill"
          innerClassName={clsx(bgColor)}
          placeholder="Tên giải thưởng"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
      </div>
    );
  };
  const Education = ({ infor, index, menu, bgColor }) => {
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
      if (school) cvEducations[index].school = school;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [school]);
    useEffect(() => {
      if (major) cvEducations[index].major = major;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [major]);
    useEffect(() => {
      if (description) cvEducations[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvEducations[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvEducations[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content border-3 border-start cv-border-main">
        <div className="d-flex flex-column">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx('fw-550', bgColor)}
            placeholder="Trường/Trung tâm"
            defaultValue={infor?.school}
            setCurrent={setSchool}
          />
          <div className="d-flex align-items-center">
            <FlexInput
              className="w-15"
              innerClassName={clsx('fst-italic text-secondary  ts-sm', bgColor)}
              placeholder="Bắt đầu"
              defaultValue={
                infor.start_date ? dayjs(infor.start_date).format('YYYY') : null
              }
              setCurrent={setStartDate}
            />
            -
            <FlexInput
              className="w-15"
              innerClassName={clsx('fst-italic text-secondary ts-sm', bgColor)}
              placeholder="Kết thúc"
              defaultValue={
                infor.end_date ? dayjs(infor.end_date).format('YYYY') : null
              }
              setCurrent={setEndDate}
            />
          </div>
        </div>
        {menu[0].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Chuyên ngành"
            defaultValue={infor?.major}
            setCurrent={setMajor}
          />
        )}
        {menu[1].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Mô tả"
            defaultValue={infor?.description}
            setCurrent={setDescription}
          />
        )}
      </div>
    );
  };

  const Experience = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
      if (name) cvExperiences[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (company) cvExperiences[index].company = company;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company]);
    useEffect(() => {
      if (description) cvExperiences[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvExperiences[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvExperiences[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content border-3 border-start cv-border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx('fw-550', bgColor)}
            placeholder="Vị trí việc làm"
            defaultValue={infor?.name}
            setCurrent={setName}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              'fst-italic text-secondary text-end ts-sm',
              bgColor,
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date
                ? dayjs(infor.start_date).format('MM/YYYY')
                : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            className="w-15"
            innerClassName={clsx('fst-italic text-secondary ts-sm', bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format('MM/YYYY') : null
            }
            setCurrent={setEndDate}
          />
        </div>

        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Công ty/Doanh nghiệp"
          defaultValue={infor?.company}
          setCurrent={setCompany}
        />

        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Project = ({ infor, index, menu, bgColor }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [role, setRole] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
      if (name) cvProjects[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (type) cvProjects[index].prj_type = type;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);
    useEffect(() => {
      if (role) cvProjects[index].role = role;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);
    useEffect(() => {
      if (technologies) cvProjects[index].technologies = technologies;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [technologies]);
    useEffect(() => {
      if (link) cvProjects[index].link = link;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);
    useEffect(() => {
      if (description) cvProjects[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvProjects[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvProjects[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content border-3 border-start cv-border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx('fw-550', bgColor)}
            placeholder="Tên dự án"
            defaultValue={infor?.name}
            setCurrent={setName}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              'fst-italic text-secondary text-end ts-sm',
              bgColor,
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date
                ? dayjs(infor.start_date).format('MM/YYYY')
                : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            className="w-15"
            innerClassName={clsx('fst-italic text-secondary ts-sm', bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              infor.end_date ? dayjs(infor.end_date).format('MM/YYYY') : null
            }
            setCurrent={setEndDate}
          />
        </div>
        <FlexInput
          innerClassName={clsx('text-capitalize text-secondary ts-sm', bgColor)}
          placeholder="Loại dự án (Cá nhân/Nhóm)"
          defaultValue={infor?.prj_type}
          setCurrent={setType}
        />
        {menu[0].on && (
          <FlexInput
            innerClassName={clsx('text-decoration-underline', bgColor)}
            placeholder="Liên kết"
            defaultValue={infor?.link}
            setCurrent={setLink}
          />
        )}
        {menu[1].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Công việc/Vai trò"
            defaultValue={infor?.role}
            setCurrent={setRole}
          />
        )}
        {menu[2].on && (
          <FlexInput
            innerClassName={clsx(bgColor)}
            placeholder="Công nghệ sử dụng"
            defaultValue={infor?.technologies}
            setCurrent={setTechnologies}
          />
        )}
        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };

  const Activity = ({ infor, index, menu, bgColor }) => {
    const [organization, setOrganization] = useState('');
    const [role, setRole] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
      if (organization) cvActivities[index].organization = organization;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization]);
    useEffect(() => {
      if (role) cvActivities[index].role = role;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);
    useEffect(() => {
      if (link) cvActivities[index].link = link;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);
    useEffect(() => {
      if (description) cvActivities[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);
    useEffect(() => {
      if (startDate) cvActivities[index].start_date = startDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);
    useEffect(() => {
      if (endDate) cvActivities[index].end_date = endDate;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate]);

    return (
      <div className="content border-3 border-start cv-border-main">
        <div className="d-flex align-items-center">
          <FlexInput
            className="flex-fill"
            innerClassName={clsx('fw-550', bgColor)}
            placeholder="Tên dự án"
            defaultValue={infor?.organization}
            setCurrent={setOrganization}
          />
          <FlexInput
            className="w-15"
            innerClassName={clsx(
              'fst-italic text-secondary text-end ts-sm',
              bgColor,
            )}
            placeholder="Bắt đầu"
            defaultValue={
              infor.start_date
                ? dayjs(infor.start_date).format('MM/YYYY')
                : null
            }
            setCurrent={setStartDate}
          />
          -
          <FlexInput
            className="w-15"
            innerClassName={clsx('fst-italic text-secondary ts-sm', bgColor)}
            placeholder="Kết thúc"
            defaultValue={
              !infor.is_present
                ? infor.end_date
                  ? dayjs(infor.end_date).format('MM/YYYY')
                  : null
                : 'hiện tại'
            }
            setCurrent={setEndDate}
          />
        </div>
        <FlexInput
          innerClassName={clsx('text-secondary ts-sm', bgColor)}
          placeholder="Vị trí/Vai trò"
          defaultValue={infor?.role}
          setCurrent={setRole}
        />
        {menu[0].on && (
          <FlexInput
            innerClassName={clsx('text-decoration-underline', bgColor)}
            placeholder="Liên kết"
            defaultValue={infor?.link}
            setCurrent={setLink}
          />
        )}
        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const Other = ({ infor, index, bgColor }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
      if (name) cvOthers[index].name = name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);
    useEffect(() => {
      if (description) cvOthers[index].description = description;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description]);

    return (
      <div className="content">
        <FlexInput
          innerClassName={clsx('title', bgColor)}
          placeholder="Khác"
          defaultValue={infor?.name}
          setCurrent={setName}
        />
        <FlexInput
          innerClassName={clsx(bgColor)}
          placeholder="Mô tả"
          defaultValue={infor?.description}
          setCurrent={setDescription}
        />
      </div>
    );
  };
  const PersonalPart = ({ bgColor }) => {
    return (
      <InforPart type="personal bg-tr">
        <InputReadOnly
          className="d-none w-75"
          textClass="text-blue"
          innerClassName={clsx('title bg-tr', bgColor)}
          placeholder="Thông tin cá nhân"
          defaultValue={
            cvMode === 'EDIT' ? basicInfor.personalTitle : 'Thông tin cá nhân'
          }
          {...register('personalTitle')}
        />
        <div className="ms-3">
          <FlexInput
            className="ms-5 w-75"
            innerClassName={clsx('content bg-tr', bgColor)}
            iconLeft={<IoCalendarClear className="mt-2  text-muted " />}
            placeholder="Ngày/tháng/năm sinh"
            defaultValue={
              cvMode !== 'CREATE_0'
                ? dayjs(basicInfor.dob).format('DD/MM/YYYY')
                : null
            }
            {...register('dob')}
          />
          <FlexInput
            className="ms-5 w-75"
            innerClassName={clsx('content bg-tr', bgColor)}
            iconLeft={<FaPhoneAlt className="mt-2 text-muted" />}
            placeholder="Số điện thoại"
            defaultValue={cvMode !== 'CREATE_0' ? basicInfor.phone : null}
            {...register('phone')}
          />
          <FlexInput
            className="ms-5 w-75"
            innerClassName={clsx('content bg-tr ', bgColor)}
            iconLeft={<IoMdMail className="mt-2 text-muted" />}
            placeholder="Email"
            defaultValue={cvMode !== 'CREATE_0' ? basicInfor.email : null}
            {...register('email')}
          />
          <FlexInput
            className="ms-5 w-75"
            innerClassName={clsx('content bg-tr cv-text-cv2', bgColor)}
            iconLeft={<IoIosLink className="mt-2 text-muted" />}
            placeholder="Liên kết"
            defaultValue={cvMode !== 'CREATE_0' ? basicInfor.link : null}
            {...register('link')}
          />
          <FlexInput
            className="ms-5 w-75"
            innerClassName={clsx('content bg-tr cv-text-cv2', bgColor)}
            iconLeft={<MdLocationOn className="fs-5 mt-2 text-muted " />}
            placeholder="Địa chỉ"
            defaultValue={cvMode !== 'CREATE_0' ? basicInfor.address : null}
            {...register('address')}
          />
        </div>
      </InforPart>
    );
  };
  const ObjectivePart = ({ bgColor }) => {
    return (
      <InforPart type="objective">
        <InputReadOnly
          textClass="text-black "
          innerClassName={clsx('title', bgColor)}
          placeholder="Vị trí ứng tuyển"
          defaultValue={
            cvMode === 'EDIT'
              ? basicInfor.objectiveTitle
              : 'Vị trí ứng tuyển'
          }
          {...register('objectiveTitle')}
        />
        <FlexInput
          innerClassName={clsx('content bg-tr2', bgColor)}
          placeholder="Nội dung"
          defaultValue={cvMode !== 'CREATE_0' ? basicInfor?.objective : null}
          {...register('objective')}
        />
      </InforPart>
    );
  };
  const SkillPart = ({ bgColor }) => {
    return (
      <InforPart type="skill">
        <div style={{ width: '100%' }} className="ps-5">
          <InputReadOnly
            textClass="text-blue"
            innerClassName={clsx('title', bgColor)}
            placeholder="Các kỹ năng"
            defaultValue={
              cvMode === 'EDIT' ? basicInfor.skillTitle : 'Các kỹ năng'
            }
            {...register('skillTitle')}
          />
          {cvSkills.map((item, index) => (
            <ContentItem
              key={`skill_${index}`}
              index={index}
              items={cvSkills}
              setItems={setCvSkills}
            >
              <Skill infor={item} index={index} bgColor={bgColor} />
            </ContentItem>
          ))}
          <hr className="cv-text-main1" />
        </div>
      </InforPart>
    );
  };
  const CertificatePart = ({ bgColor }) => {
    return (
      <InforPart type="certificate">
        <InputReadOnly
          textClass="text-blue"
          innerClassName={clsx('title', bgColor)}
          placeholder="Chứng chỉ"
          defaultValue={
            cvMode === 'EDIT' ? basicInfor.certificateTitle : 'Chứng chỉ'
          }
          {...register('certificateTitle')}
        />
        {cvCertificates.map((item, index) => (
          <ContentItem
            key={`certificate_${index}`}
            index={index}
            items={cvCertificates}
            setItems={setCvCertificates}
          >
            <Certificate infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };
  const PrizePart = ({ bgColor }) => {
    return (
      <InforPart type="prize">
        <div style={{ width: '100%' }} className="ps-5">
          <InputReadOnly
            textClass="text-blue"
            innerClassName={clsx('title', bgColor)}
            placeholder="Giải thưởng"
            defaultValue={
              cvMode === 'EDIT' ? basicInfor.prizeTitle : 'Giải thưởng'
            }
            {...register('prizeTitle')}
          />
          {cvPrizes.map((item, index) => (
            <ContentItem
              key={`prize_${index}`}
              index={index}
              items={cvPrizes}
              setItems={setCvPrizes}
            >
              <Prize infor={item} index={index} bgColor={bgColor} />
            </ContentItem>
          ))}
          <hr className="cv-text-main1" />
        </div>
      </InforPart>
    );
  };
  const EducationPart = ({ bgColor }) => {
    return (
      <InforPart type="education">
        <div style={{ marginTop: 75, width: '100%' }} className="ps-5">
          <InputReadOnly
            textClass="text-blue"
            innerClassName={clsx('title', bgColor)}
            placeholder="Học vấn"
            defaultValue={
              cvMode === 'EDIT' ? basicInfor.educationTitle : 'Học vấn'
            }
            {...register('educationTitle')}
          />
          {cvEducations.map((item, index) => (
            <ContentItem
              className="mb-1 py-1"
              key={`education_${index}`}
              index={index}
              items={cvEducations}
              setItems={setCvEducations}
              menuVaule={[
                { name: 'Chuyên ngành', on: item.major },
                { name: 'Mô tả', on: item.description },
              ]}
            >
              <Education infor={item} index={index} bgColor={bgColor} />
            </ContentItem>
          ))}
          <hr className="cv-text-main1" />
        </div>
      </InforPart>
    );
  };
  const ExperiencePart = ({ bgColor }) => {
    return (
      <InforPart type="experience">
        <InputReadOnly
          textClass="text-blue"
          innerClassName={clsx('title', bgColor)}
          placeholder="Kinh nghiệm làm việc"
          defaultValue={
            cvMode === 'EDIT'
              ? basicInfor.experienceTitle
              : 'Kinh nghiệm làm việc'
          }
          {...register('experienceTitle')}
        />
        {cvExperiences.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`experience_${index}`}
            index={index}
            items={cvExperiences}
            setItems={setCvExperiences}
          >
            <Experience infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
      </InforPart>
    );
  };
  const ProjectPart = ({ bgColor }) => {
    return (
      <InforPart type="project">
        <InputReadOnly
          textClass="text-blue"
          innerClassName={clsx('title', bgColor)}
          placeholder="Dự án"
          defaultValue={cvMode === 'EDIT' ? basicInfor.projectTitle : 'Dự án'}
          {...register('projectTitle')}
        />
        {cvProjects.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`project_${index}`}
            index={index}
            items={cvProjects}
            setItems={setCvProjects}
            menuVaule={[
              { name: 'Liên kết', on: item.link },
              { name: 'Công việc', on: item.role },
              { name: 'Công nghệ', on: item.technologies },
            ]}
          >
            <Project infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="cv-text-main1" />
      </InforPart>
    );
  };
  const ActivityPart = ({ bgColor }) => {
    return (
      <InforPart type="activity">
        <InputReadOnly
          textClass="text-blue"
          innerClassName={clsx('title', bgColor)}
          placeholder="Hoạt động"
          defaultValue={
            cvMode === 'EDIT' ? basicInfor.activityTitle : 'Hoạt động'
          }
          {...register('activityTitle')}
        />
        {cvActivities.map((item, index) => (
          <ContentItem
            className="mb-1 py-1"
            key={`activity_${index}`}
            index={index}
            items={cvActivities}
            setItems={setCvActivities}
            menuVaule={[{ name: 'Liên kết', on: item.link }]}
          >
            <Activity infor={item} index={index} bgColor={bgColor} />
          </ContentItem>
        ))}
        <hr className="cv-text-main1" />
      </InforPart>
    );
  };

  const OtherPart = ({ bgColor }) => {
    return (
      <InforPart type="other">
        <div style={{ width: '100%' }} className="ps-5">
          {cvOthers.map((item, index) => (
            <ContentItem
              className="mb-1 py-1"
              key={`other_${index}`}
              index={index}
              items={cvOthers}
              setItems={setCvOthers}
            >
              <Other infor={item} index={index} bgColor={bgColor} />
            </ContentItem>
          ))}
        </div>
      </InforPart>
    );
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBasicInfor((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPart = (index) => {
    const bgColor = index <= 5 ? 'cv-bg-main' : '';
    switch (parts[index]) {
      case 'personal':
        return <PersonalPart bgColor={bgColor} />;
      case 'objective':
        return <ObjectivePart bgColor={bgColor} />;
      case 'skill':
        return <SkillPart bgColor={bgColor} />;
      case 'certificate':
        return <CertificatePart bgColor={bgColor} />;
      case 'prize':
        return <PrizePart bgColor={bgColor} />;
      case 'education':
        return <EducationPart bgColor={bgColor} />;
      case 'experience':
        return <ExperiencePart bgColor={bgColor} />;
      case 'project':
        return <ProjectPart bgColor={bgColor} />;
      case 'activity':
        return <ActivityPart bgColor={bgColor} />;
      case 'other':
        return <OtherPart bgColor={bgColor} />;
      default:
        break;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="clearfix ms-3 py-3 border-top shadow-sm bg-white">
          <Form.Group className="float-start ms-3 w-20">
            <Form.Control
              type="text"
              aria-label="resume_title"
              size="sm"
              placeholder="Tiêu đề hồ sơ"
              defaultValue={cvMode === 'EDIT' ? basicInfor.title : null}
              className="border-primary"
              {...register('title', {
                required: 'Vui lòng điền tiêu đề hồ sơ',
              })}
              isInvalid={errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="outline-primary"
            size="sm"
            className="float-end me-5 px-5 py-1"
            onClick={reactToPrintFn}
          >
            <span className="fw-600">Tải xuống CV</span>
          </Button>
          <Button
            type="submit"
            variant="outline-primary"
            size="sm"
            className="float-end me-3 px-5 py-1"
          >
            <span className="fw-600">Lưu</span>
          </Button>
        </div>
        <div
          id="resume"
          ref={contentRef}
          className="mx-auto border d-flex gap- mt-4 mb-2 p-0 shadow-sm border-1 border-dark "
          style={{ width: '800px' }}
        >
          
          <div style={{ width: '45%' }} className="ps-0 pe-2 position-relative ">
            <div className="bg"></div>
            <div className="mt-2 d-flex flex flex-column">
              <div style={{ width: '100%', marginTop: '12px' }}>
                <FlexInput
                  placeholder="HỌ TÊN"
                  className="ms-5 mt-2"
                  innerClassName="cv-bg-main h2 cv-text-cv2 text-uppercase bg-tr"
                  defaultValue={fullname}
                  {...register('fullname')}
                />
              </div>
              <PersonalPart />
            </div>
            <EducationPart />
            <SkillPart />
            <PrizePart />
            <OtherPart />
          </div>

          <div style={{ width: '55%' }} className="d-flex flex-column gap-2">
            <div className="d-flex gap-2 mb-5 position-relative">
              <div className="position-absolute bg-2"></div>
              <div className="w-10 mt-2">
                <ObjectivePart />
              </div>
              <div
                className="mt-2"
                style={{ width: '35%', textAlign: 'center' }}
              >
                <img
                  src={basicInfor?.avatar}
                  alt="avatar"
                  width="130px"
                  height="130px"
                  className="rounded-pill"
                />
              </div>
            </div>
            <ExperiencePart />
            <ProjectPart />
            <ActivityPart />
            <CertificatePart />
          </div>
        </div>
      </form>
    </>
  );
}
