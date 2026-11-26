import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function StarOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18.7695 18.7695L19.3122 21.1691C19.3368 21.2777 19.3492 21.3888 19.3492 21.5002C19.3492 22.3285 18.6776 23.0001 17.8492 23.0001C17.5611 23.0001 17.279 22.9171 17.0368 22.761L12 19.5163L6.9632 22.761C6.721 22.9171 6.4389 23.0001 6.1508 23.0001C5.3224 23.0001 4.6508 22.3285 4.6508 21.5002C4.6508 21.3888 4.6632 21.2777 4.6878 21.1691L6.0852 14.9904L1.4944 10.8428C1.1795 10.5584 0.9998 10.1539 0.9998 9.7296C0.9998 8.9501 1.5969 8.3005 2.3737 8.2351L7.7782 7.7782ZM9.8205 5.5779C9.633 5.3903 9.5276 5.136 9.5276 4.8708C9.5276 4.7452 9.5513 4.6207 9.5973 4.5039L10.6046 1.9497C10.8306 1.3766 11.384 1 12 1C12.616 1 13.1694 1.3766 13.3954 1.9497L15.6757 7.732L21.6263 8.2351C22.4031 8.3005 23.0002 8.9501 23.0002 9.7296C23.0002 10.1539 22.8205 10.5584 22.5056 10.8428L19.3127 13.7275C19.1289 13.8935 18.89 13.9854 18.6423 13.9854C18.3771 13.9854 18.1227 13.8801 17.9352 13.6925Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22" fill="none"/>
    </svg>
  )
}
