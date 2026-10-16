import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LightbulbSparkles({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8 18L16 18M10 22L14 22" strokeOpacity="0.4"/>
      <path d="M5.1721 14.1737L5.0718 14C4.3697 12.7838 4 11.4043 4 10C4 5.5817 7.5817 2 12 2C12.0669 2 12.1335 2.0008 12.2 2.0025M19.9975 9.8C19.9992 9.8665 20 9.9331 20 10C20 11.4043 19.6303 12.7838 18.9282 14L18.8279 14.1737"/>
      <path d="M12.5492 6.3739L13.4196 8.5804L15.6261 9.4508C15.8518 9.5397 16 9.7576 16 10C16 10.2424 15.8518 10.4603 15.6261 10.5492L13.4196 11.4196L12.5492 13.6261C12.4603 13.8518 12.2424 14 12 14C11.7576 14 11.5397 13.8518 11.4508 13.6261L10.5804 11.4196L8.3739 10.5492C8.1482 10.4603 8 10.2424 8 10C8 9.7576 8.1482 9.5397 8.3739 9.4508L10.5804 8.5804L11.4508 6.3739C11.5397 6.1482 11.7576 6 12 6C12.2424 6 12.4603 6.1482 12.5492 6.3739Z" fill="currentColor" stroke="none"/>
      <path d="M17.8433 2.2337L18.3873 3.6127L19.7663 4.1567C19.9074 4.2123 20 4.3485 20 4.5C20 4.6515 19.9074 4.7877 19.7663 4.8433L18.3873 5.3873L17.8433 6.7663C17.7877 6.9074 17.6515 7 17.5 7C17.3485 7 17.2123 6.9074 17.1567 6.7663L16.6127 5.3873L15.2337 4.8433C15.0926 4.7877 15 4.6515 15 4.5C15 4.3485 15.0926 4.2123 15.2337 4.1567L16.6127 3.6127L17.1567 2.2337C17.2123 2.0926 17.3485 2 17.5 2C17.6515 2 17.7877 2.0926 17.8433 2.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
