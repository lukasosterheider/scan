import { SVGProps } from 'react'

export function dSPY (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' {...props}>
      <circle cx='16' cy='16' r='16' fill='#273F33' />
      <path d='M6.96224 17.2905H5.3344C5.32726 17.7617 5.41293 18.1687 5.59142 18.5114C5.76992 18.8541 6.0091 19.1361 6.30896 19.3574C6.61597 19.5788 6.96581 19.7394 7.35849 19.8394C7.75831 19.9465 8.16885 20 8.59009 20C9.11128 20 9.56822 19.9393 9.9609 19.8179C10.3607 19.6966 10.6927 19.5288 10.9569 19.3146C11.2282 19.0933 11.4317 18.8327 11.5673 18.5328C11.703 18.2329 11.7708 17.9081 11.7708 17.5582C11.7708 17.1299 11.678 16.78 11.4924 16.5087C11.3139 16.2303 11.0997 16.0089 10.8498 15.8447C10.5999 15.6805 10.3464 15.5627 10.0894 15.4913C9.83953 15.4128 9.64319 15.3592 9.50039 15.3307C9.02204 15.2093 8.63292 15.1093 8.33306 15.0308C8.04033 14.9523 7.80829 14.8737 7.63694 14.7952C7.47273 14.7166 7.36206 14.631 7.30494 14.5382C7.24783 14.4453 7.21927 14.324 7.21927 14.174C7.21927 14.0098 7.25497 13.8742 7.32636 13.7671C7.39776 13.66 7.48701 13.5707 7.5941 13.4993C7.70834 13.4279 7.83328 13.378 7.96893 13.3494C8.10459 13.3208 8.24024 13.3066 8.3759 13.3066C8.58295 13.3066 8.77215 13.3244 8.9435 13.3601C9.12199 13.3958 9.27906 13.4565 9.41472 13.5422C9.55037 13.6278 9.65747 13.7456 9.736 13.8956C9.82168 14.0455 9.87166 14.2347 9.88594 14.4632H11.5138C11.5138 14.0205 11.4281 13.6457 11.2568 13.3387C11.0925 13.0245 10.8676 12.7675 10.5821 12.5676C10.2965 12.3677 9.96804 12.2249 9.59678 12.1392C9.23266 12.0464 8.85068 12 8.45086 12C8.10816 12 7.76545 12.0464 7.42275 12.1392C7.08005 12.232 6.77304 12.3748 6.50173 12.5676C6.23042 12.7604 6.0091 13.0031 5.83774 13.2958C5.67353 13.5814 5.59142 13.9206 5.59142 14.3133C5.59142 14.6631 5.65568 14.963 5.7842 15.2129C5.91985 15.4556 6.09477 15.6591 6.30896 15.8233C6.52315 15.9875 6.7659 16.1232 7.03721 16.2303C7.30851 16.3302 7.58696 16.4159 7.87255 16.4873C8.151 16.5658 8.42587 16.6372 8.69718 16.7015C8.96849 16.7657 9.21124 16.8407 9.42543 16.9264C9.63962 17.012 9.81097 17.1191 9.93948 17.2477C10.0751 17.3762 10.143 17.544 10.143 17.751C10.143 17.9438 10.093 18.1044 9.99303 18.2329C9.89307 18.3543 9.76813 18.4507 9.6182 18.5221C9.46827 18.5935 9.30762 18.6435 9.13627 18.672C8.96492 18.6934 8.80428 18.7041 8.65434 18.7041C8.43301 18.7041 8.21882 18.6792 8.01177 18.6292C7.80472 18.5721 7.62266 18.49 7.46559 18.3829C7.31565 18.2686 7.19428 18.1223 7.10146 17.9438C7.00865 17.7653 6.96224 17.5475 6.96224 17.2905Z' fill='white' />
      <path d='M14.4526 15.7805V13.4886H15.7592C15.9519 13.4886 16.1376 13.5029 16.3161 13.5315C16.4946 13.56 16.6516 13.6171 16.7873 13.7028C16.9229 13.7813 17.03 13.8956 17.1086 14.0455C17.1943 14.1954 17.2371 14.3918 17.2371 14.6345C17.2371 14.8773 17.1943 15.0736 17.1086 15.2236C17.03 15.3735 16.9229 15.4913 16.7873 15.577C16.6516 15.6555 16.4946 15.7091 16.3161 15.7376C16.1376 15.7662 15.9519 15.7805 15.7592 15.7805H14.4526ZM12.7712 12.1821V19.8286H14.4526V17.087H16.2197C16.698 17.087 17.105 17.0192 17.4406 16.8835C17.7761 16.7407 18.0474 16.5551 18.2545 16.3266C18.4687 16.0982 18.6222 15.8376 18.715 15.5448C18.815 15.245 18.8649 14.9415 18.8649 14.6345C18.8649 14.3204 18.815 14.017 18.715 13.7242C18.6222 13.4315 18.4687 13.1709 18.2545 12.9424C18.0474 12.714 17.7761 12.5319 17.4406 12.3963C17.105 12.2535 16.698 12.1821 16.2197 12.1821H12.7712Z' fill='white' />
      <path d='M21.8956 16.8514V19.8286H23.577V16.8942L26.4151 12.1821H24.5409L22.7631 15.2021L20.9746 12.1821H19.0898L21.8956 16.8514Z' fill='white' />
    </svg>
  )
}