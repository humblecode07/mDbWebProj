import React, { useState, useEffect } from 'react';
import { FacebookIcon, IMDbIcon, InstagramIcon, TwitterIcon, WikiDataIcon } from '../../../assets/Icons/LinkIcons';
import { useParams } from 'react-router-dom';
import { changeExternalIds } from '../../../api/api';

const ExternalIdInput = ({ label, Icon, name, value, onChange }) => (
  <div className="external-id-input">
    <label htmlFor={name}>
      {Icon && <Icon />}
      <span>{label}</span>
    </label>
    <div className="input-wrapper">
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const ExternalIDs = ({ movieData }) => {
  const [externalIds, setExternalIds] = useState({
    facebook_id: movieData.external_ids?.facebook_id || '',
    twitter_id: movieData.external_ids?.twitter_id || '',
    instagram_id: movieData.external_ids?.instagram_id || '',
    imdb_id: movieData.external_ids?.imdb_id || '',
    wikidata_id: movieData.external_ids?.wikidata_id || '',
  });

  const { movieId } = useParams();

  useEffect(() => {
    setExternalIds({
      facebook_id: movieData.external_ids?.facebook_id || '',
      twitter_id: movieData.external_ids?.twitter_id || '',
      instagram_id: movieData.external_ids?.instagram_id || '',
      imdb_id: movieData.external_ids?.imdb_id || '',
      wikidata_id: movieData.external_ids?.wikidata_id || '',
    });
  }, [movieData]);

  const handleChangeExternalIds = (e) => {
    const { name, value } = e.target;
    setExternalIds((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveExternalIds = async () => {
    try {
      await changeExternalIds(movieId, externalIds);
      alert('External Ids have been successfully modified!');
    } catch (error) {
      alert('Error occurred while changing external ids');
      console.error('Failed to change the external ids', error);
    }
  };

  return (
    <>
      <div className="w-[51.6875rem] flex gap-[0.6875rem]">
        <div className="w-[25.5rem] flex flex-col gap-[1.25rem]">
          <span className="font-bold text-[1.125rem]">Social</span>
          <ExternalIdInput
            label="Facebook"
            Icon={FacebookIcon}
            name="facebook_id"
            value={externalIds.facebook_id}
            onChange={handleChangeExternalIds}
          />
          <ExternalIdInput
            label="Twitter"
            Icon={TwitterIcon}
            name="twitter_id"
            value={externalIds.twitter_id}
            onChange={handleChangeExternalIds}
          />
          <ExternalIdInput
            label="Instagram"
            Icon={InstagramIcon}
            name="instagram_id"
            value={externalIds.instagram_id}
            onChange={handleChangeExternalIds}
          />
        </div>
        <div className="w-[25.5rem] flex flex-col gap-[1.25rem]">
          <span className="font-bold text-[1.125rem]">Other Databases</span>
          <ExternalIdInput
            label="IMDB ID"
            Icon={IMDbIcon}
            name="imdb_id"
            value={externalIds.imdb_id}
            onChange={handleChangeExternalIds}
          />
          <ExternalIdInput
            label="WikiData ID"
            Icon={WikiDataIcon}
            name="wikidata_id"
            value={externalIds.wikidata_id}
            onChange={handleChangeExternalIds}
          />
        </div>
      </div>
      <div className="w-[51.6875rem] flex gap-[.75rem] justify-end pt-[1.25rem]">
        <button
          className="h-[2.125rem] px-[1.5625rem] bg-[#CC511D] text-[0.875rem] font-bold rounded-[.625rem]"
          onClick={handleSaveExternalIds}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default ExternalIDs;
