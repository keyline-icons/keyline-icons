import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PackageOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M4 15.0345L1.5043 13.6098C1.1925 13.4318 1 13.1003 1 12.7413C1 12.4761 1.1054 12.2218 1.2929 12.0342L4.2929 9.0342C4.3689 8.9582 4.4567 8.895 4.5528 8.8469L11.3664 5.4401L14.7776 1.3587C14.9676 1.1314 15.2486 1 15.5449 1C15.7007 1 15.8544 1.0364 15.9936 1.1063L22.4487 4.3477C22.7867 4.5174 23 4.8632 23 5.2413C23 5.4387 22.9416 5.6318 22.8321 5.796L20 10.0441L20 18.618C20 19.0017 19.7805 19.3515 19.435 19.5184L12.435 22.9004C12.2994 22.966 12.1507 23 12 23C11.8493 23 11.7006 22.966 11.565 22.9004L4.565 19.5184C4.2195 19.3515 4 19.0017 4 18.618ZM12 7.3594L7.2361 9.7413L12 12.1233L16.7639 9.7413Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
