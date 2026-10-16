import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AudioLinesSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M8 8.8444L8 19M16 6L16 11.03" strokeOpacity="0.4"/>
      <path d="M4 9.6141L4 15M12 2L12 13.0097M20 9L20 12.2225"/>
      <path d="M16.5492 14.3739L17.4196 16.5804L19.6261 17.4508C19.8518 17.5397 20 17.7576 20 18C20 18.2424 19.8518 18.4603 19.6261 18.5492L17.4196 19.4196L16.5492 21.6261C16.4603 21.8518 16.2424 22 16 22C15.7576 22 15.5397 21.8518 15.4508 21.6261L14.5804 19.4196L12.3739 18.5492C12.1482 18.4603 12 18.2424 12 18C12 17.7576 12.1482 17.5397 12.3739 17.4508L14.5804 16.5804L15.4508 14.3739C15.5397 14.1482 15.7576 14 16 14C16.2424 14 16.4603 14.1482 16.5492 14.3739Z" fill="currentColor" stroke="none"/>
      <path d="M5.8433 2.2337L6.3873 3.6127L7.7663 4.1567C7.9074 4.2123 8 4.3485 8 4.5C8 4.6515 7.9074 4.7877 7.7663 4.8433L6.3873 5.3873L5.8433 6.7663C5.7877 6.9074 5.6515 7 5.5 7C5.3485 7 5.2123 6.9074 5.1567 6.7663L4.6127 5.3873L3.2337 4.8433C3.0926 4.7877 3 4.6515 3 4.5C3 4.3485 3.0926 4.2123 3.2337 4.1567L4.6127 3.6127L5.1567 2.2337C5.2123 2.0926 5.3485 2 5.5 2C5.6515 2 5.7877 2.0926 5.8433 2.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
