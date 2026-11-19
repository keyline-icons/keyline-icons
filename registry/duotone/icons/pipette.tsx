import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pipette({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2.9066 19.6792C2.8282 19.3865 2.8161 19.0755 2.8773 18.7693L3.3016 16.648C3.379 16.2608 3.5693 15.9052 3.8485 15.626L7.007 12.4675C7.3976 12.077 8.0307 12.077 8.4212 12.4675L11.5325 15.5788C11.923 15.9693 11.923 16.6024 11.5325 16.993L8.374 20.1515C8.0948 20.4307 7.7392 20.621 7.352 20.6984L5.2307 21.1227C4.9245 21.1839 4.6135 21.1718 4.3208 21.0934L3.7071 21.7071C3.3166 22.0977 2.6834 22.0977 2.2929 21.7071C1.9023 21.3166 1.9023 20.6834 2.2929 20.2929Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M14.1134 15.3313L8.6687 9.8866C7.419 8.6369 7.419 6.6107 8.6687 5.3611C9.9184 4.1114 11.9445 4.1114 13.1942 5.3611L13.2649 5.4318L15.5984 3.0983C17.0629 1.6338 19.4372 1.6338 20.9017 3.0983C22.3662 4.5628 22.3662 6.9371 20.9017 8.4016L18.5682 10.7351L18.6389 10.8058C19.8886 12.0555 19.8886 14.0816 18.6389 15.3313C17.3893 16.581 15.3631 16.581 14.1134 15.3313Z" fill="currentColor"/>
    </svg>
  )
}
